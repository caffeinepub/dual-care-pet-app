export function BotAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Pet doctor bot avatar</title>
      <rect x="2" y="8" width="32" height="24" rx="8" fill="#4CAF50" />
      <rect
        x="2"
        y="8"
        width="32"
        height="24"
        rx="8"
        stroke="#2E7D32"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="8"
        x2="18"
        y2="3"
        stroke="#2E7D32"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="18" cy="2" r="2" fill="#FFB74D" />
      <rect x="9" y="15" width="6" height="5" rx="2" fill="white" />
      <rect x="21" y="15" width="6" height="5" rx="2" fill="white" />
      <circle cx="12" cy="17.5" r="1.5" fill="#1B5E20" />
      <circle cx="24" cy="17.5" r="1.5" fill="#1B5E20" />
      <path
        d="M12 25 Q18 28 24 25"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="26"
        width="4"
        height="2"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="6"
        y="25"
        width="2"
        height="4"
        rx="1"
        fill="white"
        opacity="0.6"
      />
    </svg>
  );
}
