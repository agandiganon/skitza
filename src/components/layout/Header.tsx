"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, MapPin } from "lucide-react";
import { ADDRESS, ADDRESS_MAP_URL, PHONE_DISPLAY, PHONE_TEL, SERVICE_PAGES } from "@/lib/constants";
import { pushToDataLayer } from "@/lib/analytics/datalayer";

const mainNavItems = [
  { label: "דף הבית", href: "/" },
  { label: "אודות", href: "/about" },
  { label: "גלריה", href: "/gallery" },
  { label: "צור קשר", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const isServicesRoute = pathname?.startsWith("/services/") ?? false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavLinkClick(
    href: string,
    event?: React.MouseEvent<HTMLAnchorElement>
  ) {
    setMobileOpen(false);
    setServicesOpen(false);

    if (href === "/" && pathname === "/" && event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white shadow-sm">
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-accent-cyan via-blue-500 to-primary" aria-hidden />
      <div className="relative mx-auto flex h-[5.4rem] max-w-7xl items-center justify-center gap-3 px-4 sm:h-[5.25rem] sm:gap-5 sm:px-6 md:justify-between lg:h-[5.5rem] lg:px-8">
        <button
          type="button"
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-foreground transition hover:bg-blue-50 hover:text-blue-600 sm:right-6 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="group flex shrink-0 items-center rounded-lg outline-none transition-transform duration-200 active:scale-[0.985] focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            aria-label="סקיצה אריזות - דף הבית"
            onClick={(event) => handleNavLinkClick("/", event)}
          >
            <Image
              src="/logo.png"
              alt="סקיצה אריזות"
              width={1536}
              height={1024}
              className="h-[4.9rem] w-auto object-contain transition duration-200 group-active:scale-[0.975] sm:h-[4.9rem] lg:h-[5.6rem]"
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 190px, 240px"
            />
          </Link>
        </div>

        <a
          href={ADDRESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-4 top-1/2 inline-flex max-w-[35%] -translate-y-1/2 items-center gap-1 text-[11px] font-semibold text-primary/85 transition hover:text-blue-700 md:hidden"
          aria-label="פתח את כתובת העסק בגוגל מפות"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden />
          <span className="truncate">{ADDRESS}</span>
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex" aria-label="ניווט ראשי">
          {mainNavItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`min-h-[44px] shrink-0 rounded-xl px-3 py-2.5 text-base font-semibold transition sm:px-4 ${
                pathname === href
                  ? "bg-blue-50 text-blue-700"
                  : "text-foreground hover:text-blue-600"
              }`}
              onClick={(event) => handleNavLinkClick(href, event)}
            >
              {label}
            </Link>
          ))}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((o) => !o)}
              className={`flex min-h-[44px] shrink-0 items-center gap-1 rounded-xl px-3 py-2.5 text-base font-semibold transition sm:px-4 ${
                isServicesRoute ? "bg-blue-50 text-blue-700" : "text-foreground hover:text-blue-600"
              }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-label="שירותים"
            >
              שירותים
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              className={`absolute start-0 top-full z-10 mt-1 min-w-[200px] rounded-xl border border-blue-200 bg-white py-2 shadow-lg transition ${servicesOpen ? "visible opacity-100" : "invisible opacity-0"}`}
              role="menu"
            >
              {SERVICE_PAGES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  role="menuitem"
                  className={`block px-4 py-2.5 text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 ${
                    pathname === href ? "bg-blue-50 text-blue-700" : "text-foreground"
                  }`}
                  onClick={() => setServicesOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <a
          href={ADDRESS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 text-xs font-medium text-foreground/70 transition hover:text-blue-700 lg:inline-flex"
          aria-label="פתח את כתובת העסק בגוגל מפות"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden />
          <span>{ADDRESS}</span>
        </a>

        <a
          id="cta-call-top"
          data-track="phone-call"
          href={`tel:${PHONE_TEL}`}
          onClick={() => pushToDataLayer("click_to_call", { placement: "header_top" })}
          className="hidden min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-[14px] font-semibold text-white shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4 sm:text-base md:flex"
          aria-label="התקשר עכשיו"
        >
          <Phone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
          <span className="lg:hidden">התקשר</span>
          <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
        </a>
      </div>
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-blue-100 bg-white md:hidden ${mobileOpen ? "block" : "hidden"}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col py-4" aria-label="ניווט נייד">
          {mainNavItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`min-h-[44px] px-6 py-3 text-base font-medium transition ${
                pathname === href
                  ? "bg-primary/6 text-primary"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
              onClick={(e) => {
                handleNavLinkClick(href, e);
              }}
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-primary/10 px-6 pt-3">
            <p className="mb-2 text-sm font-semibold text-primary">שירותים</p>
            <div className="flex flex-col gap-0">
              {SERVICE_PAGES.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`min-h-[44px] rounded-xl py-2.5 pr-4 text-base transition ${
                    pathname === href
                      ? "bg-primary/6 px-4 font-semibold text-primary"
                      : "text-foreground/90 hover:text-primary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            data-track="phone-call"
            className="mx-6 mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
            onClick={() => {
              pushToDataLayer("click_to_call", { placement: "mobile_menu" });
              setMobileOpen(false);
            }}
          >
            <Phone className="h-5 w-5" />
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </header>
  );
}
