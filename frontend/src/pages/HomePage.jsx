import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden text-slate-900">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:18px_18px] opacity-40" />
        <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute right-0 top-24 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm backdrop-blur">
                AI-powered interview practice
              </span>
              <div className="space-y-5">
                <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  Practice interviews with AI feedback that actually improves performance.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  PrepWise AI helps you rehearse HR and technical interviews, get scored by Gemini,
                  and review strengths, weaknesses, and targeted improvement suggestions.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/start-interview"
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                >
                  Start Interview
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:text-brand-700"
                >
                  Log In
                </Link>
              </div>
              <p className="text-sm text-slate-500">
                New user? <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">Create an account</Link>
              </p>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-brand-900/10 backdrop-blur-xl">
                <div className="space-y-5 rounded-[1.5rem] bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Mock Interview Session</span>
                    <span className="rounded-full bg-brand-500/20 px-3 py-1 text-brand-200">
                      Live scoring
                    </span>
                  </div>
                  <div className="space-y-4 rounded-3xl bg-slate-900 p-5 ring-1 ring-white/10">
                    <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Question</p>
                    <p className="text-lg leading-8 text-slate-100">
                      Tell me about a time you handled a difficult stakeholder and how you resolved the situation.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-slate-300">Score</p>
                      <p className="mt-2 text-3xl font-semibold text-brand-200">84</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-slate-300">Strengths</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">Clear structure, strong ownership</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-sm text-slate-300">Improve</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">Add measurable business impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
