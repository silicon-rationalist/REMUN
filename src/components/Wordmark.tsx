// Typographic wordmark placeholder.
// TODO: replace with the official RNS MUN / RNSIT logo files once supplied. None exist in the repo.
export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span
        className={`display text-[1.45rem] font-semibold tracking-tight ${
          tone === 'dark' ? 'text-navy' : 'text-ivory'
        }`}
      >
        RNS MUN
      </span>
      <span
        className={`eyebrow !text-[0.7rem] ${tone === 'dark' ? 'text-gold-ink' : 'text-gold-light'}`}
      >
        2026
      </span>
    </span>
  );
}
