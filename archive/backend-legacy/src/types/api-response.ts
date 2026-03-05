export type ApiSuccessResponse = { success: true };
export type ApiErrorResponse = { error: string };

export type HealthResponse = {
  ok: true;
  timestamp: string;
  uptime: number;
};
