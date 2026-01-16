import { InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
}

export function SearchInput({ value, onClear, className = '', ...props }: SearchInputProps) {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <Search 
        size={18} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
      />
      <input
        type="text"
        value={value}
        className="
          w-full pl-10 pr-10 py-2.5 
          bg-white border border-gray-200 rounded-xl
          text-sm text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
          transition-all duration-200
        "
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
