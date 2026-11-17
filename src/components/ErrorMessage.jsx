export default function ErrorMessage({ message }) {
  return (
    <h3 className="md:text-2xl mt-5 text-xl text-center text-red-500">
      {message || 'Server Error!'}
    </h3>
  )
}
