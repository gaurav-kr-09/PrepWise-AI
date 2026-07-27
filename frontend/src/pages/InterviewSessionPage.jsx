import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import ProtectedNavbar from '../components/ProtectedNavbar';
import LoadingScreen from '../components/ui/LoadingScreen';
import { SkeletonStack } from '../components/ui/Skeleton';

function InterviewSessionPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(location.state?.interview || null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(!location.state?.interview);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInterview = async () => {
      if (interview) {
        return;
      }

      try {
        const response = await api.get(`/interviews/${id}`);
        setInterview(response.data.interview);
      } catch (loadError) {
        const message = loadError.response?.data?.message || 'Unable to load interview.';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadInterview();
  }, [id, interview]);

  useEffect(() => {
    if (interview?.status === 'completed') {
      navigate(`/interviews/${id}/result`, { replace: true });
    }
  }, [id, interview, navigate]);

  const currentQuestion = interview?.questions?.[interview.currentQuestionIndex];
  const totalQuestions = interview?.totalQuestions || interview?.questions?.length || 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await api.post(`/interviews/${id}/answer`, {
        answer,
      });

      toast.success(response.data.completed ? 'Interview completed' : 'Answer saved');

      if (response.data.completed) {
        navigate(`/interviews/${id}/result`, {
          state: {
            interview: response.data.interview,
          },
          replace: true,
        });
        return;
      }

      const refreshed = await api.get(`/interviews/${id}`);
      setInterview(refreshed.data.interview);
      setAnswer('');
    } catch (submitError) {
      const message = submitError.response?.data?.message || 'Unable to submit your answer.';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading interview session..." />;
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

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
          {interview ? null : <SkeletonStack count={2} />}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
                Interview Session
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {interview.role}
              </h1>
              <p className="mt-2 text-slate-600">
                {interview.type.toUpperCase()} interview • {interview.experienceLevel} level
              </p>
            </div>
            <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
              Question {interview.currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-200">Current Question</p>
            <p className="mt-4 text-2xl leading-10 text-slate-100">
              {currentQuestion?.question}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="space-y-2 block">
              <span className="text-sm font-medium text-slate-700">Your Answer</span>
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                rows={8}
                placeholder="Type your response here..."
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 outline-none transition focus:border-brand-400"
              />
            </label>
            {error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            ) : null}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Your response is saved before the next question appears.
              </p>
              <button
                type="submit"
                disabled={submitting || !answer.trim()}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Submit Answer'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default InterviewSessionPage;
