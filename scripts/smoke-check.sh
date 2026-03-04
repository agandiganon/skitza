#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

FRONTEND_PORT="${FRONTEND_PORT:-3300}"
FRONTEND_ORIGIN="http://localhost:${FRONTEND_PORT}"
FRONTEND_LOG="${ROOT_DIR}/.smoke-frontend.log"
BACKEND_PORT="${BACKEND_PORT:-4300}"
BACKEND_ORIGIN="http://localhost:${BACKEND_PORT}"
BACKEND_LOG="${ROOT_DIR}/.smoke-backend.log"

cleanup() {
  if [[ -n "${FRONTEND_PID:-}" ]] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi

  export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
  export PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"
  if [[ -x "$PWCLI" ]]; then
    "$PWCLI" close >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

wait_for_url() {
  local url="$1"
  local retries="${2:-40}"
  local sleep_s="${3:-0.5}"

  for _ in $(seq 1 "$retries"); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep "$sleep_s"
  done

  echo "Failed waiting for ${url}" >&2
  return 1
}

assert_status() {
  local expected="$1"
  local actual="$2"
  local description="$3"

  if [[ "$actual" != "$expected" ]]; then
    echo "${description}: expected ${expected}, got ${actual}" >&2
    exit 1
  fi
}

assert_response_header() {
  local url="$1"
  local header_name="$2"
  local response_headers=""

  response_headers=$(curl -sSI "$url")
  if ! grep -iq "^${header_name}:" <<<"$response_headers"; then
    echo "Missing response header '${header_name}' on ${url}" >&2
    echo "$response_headers" >&2
    exit 1
  fi
}

check_console_level() {
  local level="$1"
  local expected_label="$2"
  local expected_value="$3"
  local context="$4"
  local output=""
  local log_file=""
  local summary=""

  output=$("$PWCLI" console "$level" 2>&1 || true)
  log_file=$(printf "%s" "$output" | grep -oE '\(.playwright-cli/console[^)]*\.log\)' | tail -n1 | tr -d '()')

  if [[ -z "$log_file" || ! -f "$ROOT_DIR/$log_file" ]]; then
    echo "$output" >&2
    echo "Failed to resolve console log for ${context}" >&2
    exit 1
  fi

  summary=$(head -n1 "$ROOT_DIR/$log_file")
  if ! grep -q "${expected_label}: ${expected_value}" <<<"$summary"; then
    echo "$output" >&2
    cat "$ROOT_DIR/$log_file" >&2
    echo "${context} has unexpected console ${level} count" >&2
    exit 1
  fi
}

echo "[smoke] building backend and frontend for smoke run"
npm run build -w backend >/dev/null
NEXT_PUBLIC_BACKEND_ORIGIN="$BACKEND_ORIGIN" npm run build -w frontend >/dev/null

echo "[smoke] starting backend on ${BACKEND_ORIGIN}"
PORT="$BACKEND_PORT" npm run start -w backend >"$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!

wait_for_url "${BACKEND_ORIGIN}/api/health"

echo "[smoke] starting frontend on ${FRONTEND_ORIGIN}"
NEXT_PUBLIC_BACKEND_ORIGIN="$BACKEND_ORIGIN" \
  npm run start -w frontend -- --port "$FRONTEND_PORT" >"$FRONTEND_LOG" 2>&1 &
FRONTEND_PID=$!

wait_for_url "${FRONTEND_ORIGIN}"

echo "[smoke] security headers checks"
assert_response_header "${FRONTEND_ORIGIN}/" "x-content-type-options"
assert_response_header "${FRONTEND_ORIGIN}/" "x-frame-options"
assert_response_header "${FRONTEND_ORIGIN}/" "referrer-policy"
assert_response_header "${FRONTEND_ORIGIN}/" "permissions-policy"
assert_response_header "${FRONTEND_ORIGIN}/" "strict-transport-security"
assert_response_header "${FRONTEND_ORIGIN}/" "content-security-policy"

echo "[smoke] API checks"
contact_invalid_status=$(curl -s -o /tmp/smoke_contact_invalid.json -w "%{http_code}" -X POST "${BACKEND_ORIGIN}/api/contact" -H 'Content-Type: application/json' -d '{"name":"","phone":"abc","email":"bad","service":""}')
assert_status "400" "$contact_invalid_status" "contact validation request"

contact_success_status=$(curl -s -o /tmp/smoke_contact_success.json -w "%{http_code}" -X POST "${BACKEND_ORIGIN}/api/contact" -H 'Content-Type: application/json' -d '{"name":"בדיקת סמוק","phone":"054-1234567","email":"smoke@example.com","service":"תכנון ועיצוב מוצר"}')

if [[ "$contact_success_status" != "200" && "$contact_success_status" != "500" ]]; then
  echo "contact request expected 200 or 500, got ${contact_success_status}" >&2
  exit 1
fi

export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"

if [[ ! -x "$PWCLI" ]]; then
  echo "Playwright CLI wrapper not found: $PWCLI" >&2
  exit 1
fi

echo "[smoke] desktop UI checks"
"$PWCLI" open "$FRONTEND_ORIGIN" >/dev/null
"$PWCLI" resize 1440 900 >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/" >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/gallery" >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/about" >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/contact" >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/services/print" >/dev/null

check_console_level "error" "Errors" "0" "Desktop"
check_console_level "warning" "Warnings" "0" "Desktop"

echo "[smoke] mobile UI checks"
"$PWCLI" goto "${FRONTEND_ORIGIN}/" >/dev/null
"$PWCLI" resize 390 844 >/dev/null
"$PWCLI" run-code "await page.getByRole('button', { name: /פתח תפריט|סגור תפריט/ }).click();" >/dev/null
"$PWCLI" run-code "await page.getByRole('navigation', { name: 'ניווט נייד' }).getByRole('link', { name: 'גלריה' }).click();" >/dev/null
"$PWCLI" run-code "await page.waitForURL('**/gallery');" >/dev/null
"$PWCLI" goto "${FRONTEND_ORIGIN}/" >/dev/null
"$PWCLI" run-code "await page.getByRole('button', { name: /פתח תפריט|סגור תפריט/ }).click();" >/dev/null
"$PWCLI" run-code "await page.getByRole('navigation', { name: 'ניווט נייד' }).getByRole('link', { name: 'צור קשר' }).click();" >/dev/null
"$PWCLI" run-code "await page.waitForURL('**/contact');" >/dev/null

check_console_level "error" "Errors" "0" "Mobile"
check_console_level "warning" "Warnings" "0" "Mobile"

echo "[smoke] all checks passed"
