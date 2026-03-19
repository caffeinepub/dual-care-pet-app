export function DogIllustration({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cute dog illustration</title>
      <ellipse
        cx="60"
        cy="80"
        rx="32"
        ry="26"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="48"
        r="26"
        fill="#D4B07A"
        stroke="#5D3A1A"
        strokeWidth="2.5"
      />
      <ellipse
        cx="38"
        cy="36"
        rx="10"
        ry="16"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2.5"
        transform="rotate(-15 38 36)"
      />
      <ellipse
        cx="82"
        cy="36"
        rx="10"
        ry="16"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2.5"
        transform="rotate(15 82 36)"
      />
      <ellipse
        cx="60"
        cy="56"
        rx="12"
        ry="9"
        fill="#E8C89A"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="52" rx="5" ry="3.5" fill="#5D3A1A" />
      <circle
        cx="50"
        cy="44"
        r="5"
        fill="white"
        stroke="#5D3A1A"
        strokeWidth="1.5"
      />
      <circle cx="51" cy="44" r="2.5" fill="#2C1810" />
      <circle cx="52" cy="43" r="0.8" fill="white" />
      <circle
        cx="70"
        cy="44"
        r="5"
        fill="white"
        stroke="#5D3A1A"
        strokeWidth="1.5"
      />
      <circle cx="71" cy="44" r="2.5" fill="#2C1810" />
      <circle cx="72" cy="43" r="0.8" fill="white" />
      <path
        d="M54 59 Q60 64 66 59"
        stroke="#5D3A1A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="60" cy="63" rx="5" ry="4" fill="#E57373" />
      <path
        d="M92 78 Q105 68 100 58"
        stroke="#C8A46E"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M92 78 Q105 68 100 58"
        stroke="#5D3A1A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="36"
        y="98"
        width="12"
        height="16"
        rx="6"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
      <rect
        x="52"
        y="100"
        width="12"
        height="14"
        rx="6"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
      <rect
        x="68"
        y="100"
        width="12"
        height="14"
        rx="6"
        fill="#C8A46E"
        stroke="#5D3A1A"
        strokeWidth="2"
      />
      <path
        d="M32 72 Q60 82 88 72"
        stroke="#4CAF50"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="60"
        cy="79"
        r="4"
        fill="#FFB74D"
        stroke="#5D3A1A"
        strokeWidth="1.5"
      />
    </svg>
  );
}
