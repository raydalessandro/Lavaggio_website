export default function Card({ 
  title, 
  children, 
  actions,
  className = '',
  hover = false 
}) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200 
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${className}
      `}
    >
      {/* Header con titolo e actions opzionali */}
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
