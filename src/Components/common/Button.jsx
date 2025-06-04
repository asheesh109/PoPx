import { useTheme } from '../../Contexts/ThemeContext'

export const Button = ({ 
  children, 
  onClick, 
  disabled, 
  loading, 
  variant = 'primary', 
  size = 'lg',
  className = '',
  type = 'button'
}) => {
  const { isDark } = useTheme()
  
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center'
  
  const variants = {
    primary: `bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
    }`,
    secondary: `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : children}
    </button>
  )
}