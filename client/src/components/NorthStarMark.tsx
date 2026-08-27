/** Orbital Editorial brand primitive: the Aurora Cyan north-star aperture used across every POLARIS route. */
export function NorthStarMark({ className = "" }: { className?: string }) {
  return <svg className={`north-star-mark ${className}`} viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M18 1.8 21.4 14.6 34.2 18l-12.8 3.4L18 34.2l-3.4-12.8L1.8 18l12.8-3.4L18 1.8Z" fill="currentColor" opacity=".95"/><path d="m18 8 2.05 7.95L28 18l-7.95 2.05L18 28l-2.05-7.95L8 18l7.95-2.05L18 8Z" fill="#06223A"/><circle cx="18" cy="18" r="2.15" fill="currentColor"/></svg>;
}
