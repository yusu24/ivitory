import GununganIcon from './GununganIcon';

export default function Ornament({ className = '', tone = 'gold' }) {
  const lineClass = tone === 'gold' ? 'bg-gold-500' : 'bg-emerald-600';
  const iconClass = tone === 'gold' ? 'text-gold-500' : 'text-emerald-600';

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-12 ${lineClass}`} />
      <GununganIcon className={`h-5 w-5 ${iconClass}`} color="currentColor" />
      <span className={`h-px w-12 ${lineClass}`} />
    </div>
  );
}
