export function GridBackground() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    />
  );
}