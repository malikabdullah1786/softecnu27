export default function Heading({ text, badge, subtitle, className = '' }) {
  return (
    <div className={`py-6 px-4 mt-4 mb-8 text-center ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded-md bg-dark text-primary text-[10px] font-extrabold uppercase tracking-widest mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-extrabold md:text-5xl text-dark tracking-tight">
        {text || 'SOFTEC'}
      </h1>
      {subtitle && (
        <p className="text-sm md:text-base text-dark/70 max-w-2xl mx-auto mt-3">{subtitle}</p>
      )}
      <div className="w-16 h-1.5 bg-primary mx-auto mt-4 rounded-full border border-secondary/20" />
    </div>
  )
}
