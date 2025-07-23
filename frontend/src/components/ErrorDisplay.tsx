import React from 'react';

export type ErrorType = 'network' | 'validation' | 'notFound' | 'server' | 'unknown';

interface ErrorDisplayProps {
  error: Error | string;
  type?: ErrorType;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  type = 'unknown',
  onRetry,
  className = ''
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  const getErrorConfig = (errorType: ErrorType) => {
    switch (errorType) {
      case 'network':
        return {
          icon: '🌐',
          title: 'Network Error',
          description: 'Unable to connect to the server. Please check your internet connection.',
          action: 'Try Again'
        };
      case 'validation':
        return {
          icon: '⚠️',
          title: 'Validation Error',
          description: 'Please check the information you entered and try again.',
          action: 'Fix & Retry'
        };
      case 'notFound':
        return {
          icon: '🔍',
          title: 'Not Found',
          description: 'The requested resource could not be found.',
          action: 'Go Back'
        };
      case 'server':
        return {
          icon: '⚡',
          title: 'Server Error',
          description: 'Something went wrong on our end. Please try again later.',
          action: 'Retry'
        };
      default:
        return {
          icon: '❌',
          title: 'Unexpected Error',
          description: 'Something unexpected happened. Please try again.',
          action: 'Retry'
        };
    }
  };

  const config = getErrorConfig(type);

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{config.icon}</div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            {config.title}
          </h3>

          <p className="text-sm text-red-700 mb-3">
            {config.description}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 transition-colors duration-200"
            >
              {config.action}
            </button>
          )}
        </div>
      </div>

      {/* Error details (collapsible) */}
      <details className="mt-3">
        <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800">
          Show Error Details
        </summary>
        <pre className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
          {errorMessage}
        </pre>
      </details>
    </div>
  );
};

export default ErrorDisplay;
