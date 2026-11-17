function ButtonSpinner() {
  return (
    <svg
      className="w-5 h-5 animate-spin ml-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default function Button({ onClick, type = 'submit', loading, disabled, outlined, download, text }) {
  return (
    <div className="flex justify-center w-full mt-6">
      <button
        onClick={onClick}
        type={type}
        disabled={loading || disabled}
        className={`inline-flex items-center justify-center gap-2 min-w-[200px] px-7 py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          outlined
            ? 'bg-white text-secondary border-2 border-secondary/30 hover:border-secondary hover:bg-secondary hover:text-primary'
            : 'bg-dark text-primary hover:bg-secondary hover:shadow-glow'
        }`}
      >
        {download && !loading && (
          <span className="material-symbols-outlined text-lg">download</span>
        )}
        {loading ? (
          <>
            <span>Sending...</span>
            <ButtonSpinner />
          </>
        ) : (
          <span>{text || 'Submit'}</span>
        )}
      </button>
    </div>
  )
}
