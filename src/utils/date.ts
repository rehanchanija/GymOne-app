export function remainingDays(endDate: string) {
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}