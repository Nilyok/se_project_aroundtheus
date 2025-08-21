export function logApiError(context, err) {
  const message = err?.message ? err.message : String(err);
  console.error(`[API] ${context} failed: ${message}`);
}
