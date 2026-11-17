export default function FormInput({ text, type, list = [], tooltip, helperText, ...rest }) {
  const baseInputClass =
    'bg-gray-50 focus:outline-none focus:shadow-input block w-full p-3 text-sm text-gray-900 border border-gray-400 rounded-lg'

  const renderControl = () => {
    switch (type) {
      case 'textarea':
        return <textarea spellCheck={false} {...rest} className={baseInputClass} />
      case 'select':
      case 'select-gender':
        return (
          <select className={baseInputClass} {...rest}>
            <option value="">{`Select ${text}`}</option>
            {list.map((item) => (
              <option key={item.id} value={type === 'select' ? item.id : item.value}>
                {item.name}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <div className="flex items-center h-11">
            <input
              type="checkbox"
              {...rest}
              className="w-5 h-5 text-secondary bg-light border-secondary/30 rounded focus:ring-secondary focus:ring-2"
            />
            <label className="ml-3 text-sm font-medium text-gray-900">
              {text} {rest.required && <span className="text-red-500">*</span>}
            </label>
            {tooltip && <span className="ml-2 text-xs text-gray-500">({tooltip})</span>}
          </div>
        )
      default:
        return <input type={type || 'text'} {...rest} className={baseInputClass} />
    }
  }

  if (type === 'checkbox') {
    return (
      <div className="flex-1 mb-6">
        {renderControl()}
        {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    )
  }

  return (
    <div className="flex-1 mb-6">
      <label className="block mb-2 text-sm font-bold text-gray-700">
        {text} {rest.required && <span className="text-red-500">*</span>}
      </label>
      {renderControl()}
      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  )
}
