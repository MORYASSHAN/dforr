// Line icons used inside the Maya app screens.
const paths = {
  explore: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  events: <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5zM3.5 10h17M8 3v4M16 3v4" />,
  camera: (
    <>
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  bedroom: <path d="M4 18v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6M4 15h16M7 9V6.5h4V9" />,
  chat: <path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 17h-8l-4 3v-3H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 5z" />,
  lock: <path d="M7.5 10.5h9a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 18v-5a2.5 2.5 0 0 1 2.5-2.5zM8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />,
  back: <path d="m14 6-6 6 6 6" />,
  mic: <path d="M12 3.5a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-5a3 3 0 0 1 3-3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" />,
  phone: <path d="M6.5 4h3l1.5 4-2 1.2a10 10 0 0 0 4.8 4.8l1.2-2 4 1.5v3A2 2 0 0 1 17 18.5 13.5 13.5 0 0 1 4.5 6 2 2 0 0 1 6.5 4z" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
