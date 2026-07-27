import { Link } from 'react-router-dom';

function InterviewListItem({ interview }) {
  const destination =
    interview.status === 'completed'
      ? `/interviews/${interview._id}/result`
      : `/interviews/${interview._id}`;

  return (
    <Link
      to={destination}
      className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-ink transition group-hover:text-brand-700">
            {interview.role}
          </p>
          <p className="text-sm text-slate-500">
            {interview.type?.toUpperCase()} • {interview.experienceLevel} • {interview.status}
          </p>
        </div>
        <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
          Score: {interview.evaluation?.overallScore ?? 0}
        </div>
      </div>
    </Link>
  );
}

export default InterviewListItem;
