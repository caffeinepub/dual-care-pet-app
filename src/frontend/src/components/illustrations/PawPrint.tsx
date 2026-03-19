export function PawPrint({
  size = 24,
  color = "#4CAF50",
}: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Paw print</title>
      <ellipse cx="12" cy="14" rx="5.5" ry="4.5" fill={color} opacity="0.9" />
      <ellipse
        cx="7"
        cy="10.5"
        rx="2.2"
        ry="2.8"
        fill={color}
        opacity="0.8"
        transform="rotate(-15 7 10.5)"
      />
      <ellipse
        cx="17"
        cy="10.5"
        rx="2.2"
        ry="2.8"
        fill={color}
        opacity="0.8"
        transform="rotate(15 17 10.5)"
      />
      <ellipse
        cx="10"
        cy="8"
        rx="1.8"
        ry="2.4"
        fill={color}
        opacity="0.75"
        transform="rotate(-5 10 8)"
      />
      <ellipse
        cx="14"
        cy="8"
        rx="1.8"
        ry="2.4"
        fill={color}
        opacity="0.75"
        transform="rotate(5 14 8)"
      />
    </svg>
  );
}
