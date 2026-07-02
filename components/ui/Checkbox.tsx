import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, ...rest },
  ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div>
      <label htmlFor={fieldId} className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
        <input
          id={fieldId}
          ref={ref}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-600',
            error && 'border-red-400'
          )}
          {...rest}
        />
        <span className="leading-relaxed">{label}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-1 ml-7 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
