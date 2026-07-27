function ActivityItem({ title, description, meta }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
          {meta}
        </span>
      </div>
    </div>
  );
}

export default ActivityItem;
