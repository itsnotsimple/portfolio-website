/**
 * True for touch / handset-class devices, or any viewport narrower than
 * `maxWidth`. Centralises the UA + width sniff that several components used to
 * duplicate inline. Pass the breakpoint you need:
 *   - 768  → phones (Hero, Work, Plasma resize)
 *   - 1024 → phones + small tablets (background parallax)
 */
export function isMobileDevice(maxWidth = 768): boolean {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < maxWidth;
}
