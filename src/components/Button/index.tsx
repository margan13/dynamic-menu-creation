import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
} from 'react';
import { cn } from '../../utils';
import { IconType } from '../../icons/Icon';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & {
    borderless?: boolean;
    className?: string;
    icon?: IconType;
    iconSize?: number;
    iconPosition?: 'left' | 'right';
    transparent?: boolean;
    variant?: 'primary' | 'secondary' | 'default';
  };

export const Button: FC<ButtonProps> = ({
  borderless = false,
  children,
  className,
  icon,
  iconSize = 16,
  iconPosition = 'left',
  transparent,
  variant = 'default',
  ...props
}) => {
  const Icon = icon;

  return (
    <button
      className={cn(
        `button button-variant-${variant}`,
        { 'button-borderless': borderless },
        { 'button-transparent': transparent },
        { 'button-icon-only': !!Icon && !children },
        className,
      )}
      {...props}
    >
      {children}

      {Icon && (
        <span className={cn({ 'order-first': iconPosition === 'left' })}>
          <Icon width={iconSize} height={iconSize} />
        </span>
      )}
    </button>
  );
};
