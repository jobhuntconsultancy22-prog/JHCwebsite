export default function Skeleton({ width = "100%", height = "16px", radius = "4px", style = {} }) {
  return (
    <div
      className="skeleton-block"
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}
