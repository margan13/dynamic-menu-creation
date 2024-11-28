import { FC, ReactNode } from 'react';
import { cn } from '../../utils';

export interface InputLabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export const InputLabel: FC<InputLabelProps> = ({
  children,
  className,
  htmlFor,
}) => (
  <label
    htmlFor={htmlFor}
    className={cn('mb-1.5 font-medium text-gray-800', className)}
  >
    {children}
  </label>
);
