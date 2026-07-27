import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProtectedNavbar from '../components/ProtectedNavbar';
import { AuthContext } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import InterviewListItem from '../components/dashboard/InterviewListItem';
import ActivityItem from '../components/dashboard/ActivityItem';
import { SkeletonStack } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import useInterviewHistory from '../hooks/useInterviewHistory';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { history, loading, error } = useInterviewHistory({ page: 1, limit: 5 });

  const stats = useMemo(() => {
    const completedInterviews = history.filter((item) => item.status === 'completed');
    const scores = completedInterviews.map((item) => item.evaluation?.overallScore ?? 0);
    const averageScore = scores.length
      ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
      : 0;
    const bestScore = scores.length ? Math.max(...scores) : 0;

    return {
      averageScore,
      bestScore,
      completedCount: completedInterviews.length,
    };
  }, [history]);

  const recentActivity = history.slice(0, 3);
  const previousInterviews = history.slice(0, 5);

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
                Welcome card
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {user?.name ? `${user.name},` : ''} your interview workspace is ready.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Start a new HR or technical session, review prior interview history, and use Gemini-backed feedback to sharpen your answers.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/start-interview"
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                >
                  Start New Interview
                </Link>
                <Link
                  to="/history"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:text-brand-700"
                >
                  View History
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Recent Activity</p>
                <div className="mt-4 space-y-4">
                  {recentActivity.length ? (
                    recentActivity.map((item) => (
                      <ActivityItem
                        key={item._id}
                        title={item.role}
                        description={`${item.type?.toUpperCase()} interview • ${item.status}`}
                        meta={item.evaluation?.overallScore ?? 0}
                      />
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-slate-300">
                      Your recent interview activity will appear here after your first session.
                    </p>
                  )}
                </div>
              </div>
              <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                  Tip
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Keep answers structured using the STAR method for HR questions and clear reasoning for technical prompts.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Average Score"
              value={loading ? '—' : stats.averageScore}
              helper="Based on completed interviews"
            />
            <StatCard
              label="Best Score"
              value={loading ? '—' : stats.bestScore}
              helper="Highest overall score achieved"
            />
            <StatCard
              label="Completed Interviews"
              value={loading ? '—' : stats.completedCount}
              helper="Sessions fully evaluated by Gemini"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
                    Previous Interviews
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                    Review your last sessions
                  </h2>
                </div>
                <Link to="/history" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
                  View all
                </Link>
              </div>

              {error ? (
                <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="mt-6 grid gap-4">
                {loading ? (
                  <SkeletonStack count={3} />
                ) : previousInterviews.length ? (
                  previousInterviews.map((interview) => (
                    <InterviewListItem key={interview._id} interview={interview} />
                  ))
                ) : (
                  <EmptyState
                    title="No interviews yet"
                    description="Start a new interview to populate this section."
                    action={
                      <Link
                        to="/start-interview"
                        className="inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                      >
                        Start New Interview
                      </Link>
                    }
                  />
                )}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Workflow</p>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>Choose interview type</li>
                  <li>Set role and experience</li>
                  <li>Answer one question at a time</li>
                  <li>Receive scored AI feedback</li>
                </ol>
              </div>
              <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                  Start New Interview
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Launch a fresh HR or technical mock interview in a couple of clicks.
                </p>
                <Link
                  to="/start-interview"
                  className="mt-5 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                >
                  Start New Interview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
