import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-slate-900">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/85 p-8 text-center shadow-xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:text-brand-700"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
