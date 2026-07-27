function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-4xl font-semibold tracking-tight text-ink">{value}</p>
      </div>
      {helper ? <p className="mt-3 text-sm leading-6 text-slate-500">{helper}</p> : null}
    </div>
  );
}

export default StatCard;
