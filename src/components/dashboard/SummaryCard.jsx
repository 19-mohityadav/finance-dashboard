export default function SummaryCard({ title, value, accent }) {
  return (
    <div className="glass p-5 shadow-lg transition hover:-translate-y-0.5">
      <p className="text-sm text-white/60">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${accent || ""}`}>₹{value}</h2>
    </div>
  );
}