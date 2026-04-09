export default function Loading() {
  return (
    <div className="relative min-h-[45vh] bg-background">
      <div className="nav-loader-bar" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(228,142,53,0.12),transparent_32%),linear-gradient(180deg,rgba(248,249,241,0.86),rgba(248,249,241,0.72))]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="nav-loader-badge">
          <span className="nav-loader-spinner" />
        </div>
      </div>
    </div>
  );
}
