import { ForwardRefExoticComponent, ReactNode, SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

export type IconType =
  | ((props: IconProps) => JSX.Element)
  | ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>
    >;

export const Icon = ({
  children,
  size = 20,
  className = 'fill-current',
  viewBox = '0 0 24 24',
  ...props
}: IconProps & {
  children: ReactNode;
}) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox={viewBox}
    className={className}
    {...props}
  >
    {children}
  </svg>
);
