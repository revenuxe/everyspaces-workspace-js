export default function Loading() {
  return (
    <div className="min-h-[45vh] bg-background">
      <div className="nav-loader-bar" />
      <div className="mx-auto flex max-w-7xl justify-center px-4 pt-12 sm:px-6 sm:pt-16 lg:px-12">
        <div className="nav-loader-shell">
          <div className="nav-loader-orbit">
            <span className="nav-loader-dot nav-loader-dot-a" />
            <span className="nav-loader-dot nav-loader-dot-b" />
            <span className="nav-loader-core" />
          </div>
          <div className="nav-loader-copy">
            <span>EverySpaces</span>
            <span>Preparing your next workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
