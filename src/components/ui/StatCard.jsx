import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ 
  title, 
  value, 
  change,
  trend = 'neutral',
  icon: Icon,
  className = ''
}) {
  const trendConfig = {
    up: { 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      icon: TrendingUp 
    },
    down: { 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      icon: TrendingDown 
    },
    neutral: { 
      color: 'text-gray-600', 
      bg: 'bg-gray-50',
      icon: Minus 
    }
  };
  
  const config = trendConfig[trend];
  const TrendIcon = config.icon;
  
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-200 p-6
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        {/* Left: Title + Value */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {value}
          </p>
          
          {/* Change indicator */}
          {change && (
            <div className="flex items-center gap-1">
              <div className={`flex items-center gap-1 ${config.color}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {change}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Right: Icon */}
        {Icon && (
          <div className={`${config.bg} p-3 rounded-lg`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
        )}
      </div>
    </div>
  );
}
