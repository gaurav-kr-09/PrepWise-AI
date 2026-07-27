function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-slate-600">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <span className="h-3 w-3 animate-pulse rounded-full bg-brand-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
