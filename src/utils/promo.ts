/** Registration fee promo: the last day it applies, 10 November 2026 (month index 10 is November). */
export const PROMO_LAST_DAY = new Date(2026, 10, 10);

/** Whole days until the last day of the promo, or null once it has ended. */
export const promoDaysLeft = (): number | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((PROMO_LAST_DAY.getTime() - today.getTime()) / 86400000);
  return days >= 0 ? days : null;
};
