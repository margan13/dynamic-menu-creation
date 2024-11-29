import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { FieldError } from 'react-hook-form';
import { InputLabel } from './InputLabel';
import { InputError } from './InputError';
import { cn } from '../../utils';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  disabled?: boolean;
  error?: string | FieldError;
  label?: ReactNode;
  type?: HTMLInputTypeAttribute;
  prefix?: ReactElement | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    readOnly,
    disabled = readOnly,
    error,
    label,
    type = 'text',
    prefix,
    ...props
  },
  ref,
) {
  return (
    <div className="w-full">
      {label && <InputLabel htmlFor={props.name}>{label}</InputLabel>}

      <div
        className={cn(
          'group flex w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 transition focus-within:border-gray-600',
          {
            '[&:not(:focus-within)]:hover:border-gray-600': !error && !disabled,
            '!border-red-500': error && !disabled,
            'bg-gray-200': disabled,
          },
          className,
        )}
      >
        {prefix && !props.value && (
          <div className="mr-1 text-gray-600">{prefix}</div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            'm-0 block w-full border-none bg-transparent bg-clip-padding text-gray-900 transition ease-in-out placeholder:text-gray-600 focus:outline-none',
            { '!text-red-500 placeholder:!text-red-500': error && !disabled },
          )}
          {...props}
        />
      </div>

      {error && <InputError error={error} />}
    </div>
  );
});
