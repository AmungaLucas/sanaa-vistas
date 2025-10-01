const LoaderSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="h-8 bg-muted rounded w-2/3 mb-4"></div>
    <div className="h-64 bg-muted rounded mb-6"></div>
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded w-full"></div>
      ))}
    </div>
  </div>
);

export default LoaderSkeleton;
