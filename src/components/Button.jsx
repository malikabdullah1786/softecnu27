function ButtonSpinner() {
  return (
    <svg
      className="w-7 h-7 animate-spin ml-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      className="stroke-black group-hover:stroke-white mr-3 transition-all"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M20 8H15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.5 13H11V17H11.5C12.6046 17 13.5 16.1046 13.5 15C13.5 13.8954 12.6046 13 11.5 13Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 17V13L17.5 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 15H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7 17L7 15.5M7 15.5L7 13L7.75 13C8.44036 13 9 13.5596 9 14.25V14.25C9 14.9404 8.44036 15.5 7.75 15.5H7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Button({ onClick, type = 'submit', loading, disabled, outlined, download, text }) {
  return (
    <div className="md:mt-10 flex justify-center w-full mt-5">
      <button
        onClick={onClick}
        type={type}
        disabled={loading || disabled}
        className={`relative disabled:opacity-75 disabled:cursor-not-allowed hover:scale-[1.02] transition-bg min-w-[150px] md:min-w-[250px] mx-auto inline-flex p-0.5 items-center justify-center overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-secondary to-dark group-hover:from-dark group-hover:to-secondary ${
          outlined ? 'text-secondary hover:text-primary' : 'hover:text-primary text-light'
        } focus:ring-4 focus:outline-none focus:ring-primary/50`}
      >
        <span
          className={`relative w-full uppercase text-base md:text-lg font-bold justify-center px-6 py-2 md:px-9 md:py-3 flex flex-row transition-all ease-in duration-75 ${
            outlined ? 'bg-white' : ''
          } rounded-md group-hover:bg-opacity-0`}
        >
          {download && !loading && <DocumentIcon />}
          {loading ? (
            <>
              Sending... <ButtonSpinner />
            </>
          ) : (
            text || 'Submit'
          )}
        </span>
      </button>
    </div>
  )
}
