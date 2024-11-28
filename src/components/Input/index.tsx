import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { FieldError } from 'react-hook-form';
import { IconType } from '../../icons/Icon';
import { InputLabel } from './InputLabel';
import { InputError } from './InputError';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  error?: string | FieldError;
  icon?: IconType;
  label?: ReactNode;
  type?: HTMLInputTypeAttribute;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    readOnly,
    disabled = readOnly,
    error,
    icon: Icon,
    label,
    type = 'text',
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
        {Icon && (
          <span className="mr-2">
            <Icon className="fill-current" />
          </span>
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
