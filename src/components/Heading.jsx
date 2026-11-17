export default function Heading({ text, className = '' }) {
  return (
    <div className={`py-10 px-5 mt-10 mb-6 text-center ${className}`}>
      <h1 className="text-2xl font-bold md:text-4xl text-secondary">
        {text || 'SOFTEC'}
      </h1>
      <div className="w-20 h-1.5 bg-primary mx-auto mt-3 rounded-full" />
    </div>
  )
}
