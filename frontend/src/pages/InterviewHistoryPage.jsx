import { Link } from 'react-router-dom';
import api from '../services/api';
import ProtectedNavbar from '../components/ProtectedNavbar';
import InterviewHistoryItem from '../components/history/InterviewHistoryItem';
import PaginationControls from '../components/history/PaginationControls';
import EmptyState from '../components/ui/EmptyState';
import { SkeletonStack } from '../components/ui/Skeleton';
import useInterviewHistory from '../hooks/useInterviewHistory';
import { useState } from 'react';
import toast from 'react-hot-toast';

function InterviewHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState('');
  const { history, meta, loading, error, refetch, setError } = useInterviewHistory({
    page: currentPage,
    limit: 5,
  });

  const handleDelete = async (interview) => {
    const confirmed = window.confirm(
      `Delete interview for ${interview.role}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(interview._id);
    setError('');

    try {
      await api.delete(`/interviews/${interview._id}`);
      await refetch();
      toast.success('Interview deleted successfully');
    } catch (deleteError) {
      toast.error(deleteError.response?.data?.message || 'Unable to delete interview.');
      setError(deleteError.response?.data?.message || 'Unable to delete interview.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <main className="min-h-screen text-slate-900">
      <ProtectedNavbar />
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
            Interview History
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Past sessions</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Review your previous interviews by date, type, and score. Open the result page or remove any session you no longer need.
          </p>

          {loading ? <SkeletonStack count={5} className="mt-8" /> : null}
          {error ? <p className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-red-700">{error}</p> : null}

          <div className="mt-8 space-y-4">
            {!loading && history.length
              ? history.map((item) => (
                <InterviewHistoryItem
                  key={item._id}
                  interview={item}
                  onDelete={handleDelete}
                  deleting={deletingId === item._id}
                />
              ))
              : null}
            {!loading && !history.length ? (
              <EmptyState
                title="No interviews yet"
                description="Start one now and your previous interviews will appear here with pagination."
                action={
                  <Link
                    to="/start-interview"
                    className="inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                  >
                    Start New Interview
                  </Link>
                }
              />
            ) : null}
          </div>

          <PaginationControls
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
}

export default InterviewHistoryPage;
