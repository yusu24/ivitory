export default function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-taupe-400/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-taupe-400" />
      <span className="h-px w-16 bg-taupe-400/50" />
    </div>
  );
}
