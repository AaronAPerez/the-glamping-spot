import React, { forwardRef, useId } from "react";

/**
 * Enhanced Radio component with improved accessibility
 */
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    label,
    description,
    className = '',
    id: providedId,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="flex items-center h-6">
          <input
            ref={ref}
            type="radio"
            id={id}
            className="
              w-5 h-5 
              text-emerald-700 
              bg-white 
              border-2 border-gray-400 
              focus:ring-4 focus:ring-emerald-500/20 
              focus:ring-offset-0
              checked:bg-emerald-700 
              checked:border-emerald-700
              transition-colors duration-200
            "
            aria-describedby={descriptionId}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label 
                htmlFor={id}
                className="block text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p 
                id={descriptionId}
                className="text-sm text-gray-600 mt-1"
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
