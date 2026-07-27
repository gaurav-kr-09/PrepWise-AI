import { Link } from 'react-router-dom';

function InterviewHistoryItem({ interview, onDelete, deleting = false }) {
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(interview.createdAt));

  const resultHref =
    interview.status === 'completed'
      ? `/interviews/${interview._id}/result`
      : `/interviews/${interview._id}`;

  return (
    <div className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.8fr] lg:items-center">
      <div>
        <p className="text-lg font-semibold text-ink">{interview.role}</p>
        <p className="mt-1 text-sm text-slate-500">{dateLabel}</p>
      </div>
      <div className="text-sm text-slate-600">
        <span className="font-medium text-ink">Type:</span> {interview.type?.toUpperCase()}
      </div>
      <div className="text-sm text-slate-600">
        <span className="font-medium text-ink">Score:</span> {interview.evaluation?.overallScore ?? 0}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link
          to={resultHref}
          className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          View Result
        </Link>
        <button
          type="button"
          onClick={() => onDelete(interview)}
          disabled={deleting}
          className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
        >
          {deleting ? 'Deleting...' : 'Delete Interview'}
        </button>
      </div>
    </div>
  );
}

export default InterviewHistoryItem;
