import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import ProtectedNavbar from '../components/ProtectedNavbar';
import LoadingScreen from '../components/ui/LoadingScreen';
import { SkeletonStack } from '../components/ui/Skeleton';

function InterviewResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const [interview, setInterview] = useState(location.state?.interview || null);
  const [loading, setLoading] = useState(!location.state?.interview);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResult = async () => {
      if (interview) {
        return;
      }

      try {
        const response = await api.get(`/interviews/${id}`);
        setInterview(response.data.interview);
      } catch (loadError) {
        const message = loadError.response?.data?.message || 'Unable to load interview results.';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [id, interview]);

  if (loading) {
    return <LoadingScreen message="Loading results..." />;
  }

  if (error && !interview) {
    return (
      <main className="min-h-screen text-slate-900">
        <ProtectedNavbar />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-[2rem] bg-red-50 p-8 text-red-700">{error}</div>
        </div>
      </main>
    );
  }

  const evaluation = interview?.evaluation || {};

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
          {interview ? null : <SkeletonStack count={3} />}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
                Result Page
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
                Interview completed
              </h1>
              <p className="mt-2 text-slate-600">
                {interview?.role} • {interview?.type?.toUpperCase()} • {interview?.experienceLevel}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 px-6 py-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Overall Score</p>
              <p className="mt-2 text-5xl font-semibold text-white">
                {evaluation.overallScore ?? 0}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ScoreCard label="Communication Score" value={evaluation.communicationScore ?? 0} />
            <ScoreCard label="Technical Score" value={evaluation.technicalScore ?? 0} />
            <ScoreCard label="Questions Answered" value={interview?.questions?.length || 0} />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ResultPanel title="Strengths" items={evaluation.strengths || []} />
            <ResultPanel title="Weaknesses" items={evaluation.weaknesses || []} />
            <ResultPanel
              title="Suggested Improvements"
              items={evaluation.suggestedImprovements || []}
            />
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Final Summary
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                {evaluation.finalSummary || 'No final summary returned.'}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/start-interview"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
            >
              Start Another Interview
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:text-brand-700"
            >
              View Interview History
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ScoreCard({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function ResultPanel({ title, items }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">{title}</p>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
        {items.length ? (
          items.map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>No feedback available.</li>
        )}
      </ul>
    </div>
  );
}

export default InterviewResultPage;
