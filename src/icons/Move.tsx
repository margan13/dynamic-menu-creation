import React from 'react';

import { Icon, IconProps } from 'src/icons/Icon';

export const Move = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <defs>
        <clipPath id="clip0_1203_384">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip0_1203_384)">
        <path
          d="M4.16667 7.50002L1.66667 10M1.66667 10L4.16667 12.5M1.66667 10H18.3333M7.5 4.16669L10 1.66669M10 1.66669L12.5 4.16669M10 1.66669V18.3334M12.5 15.8334L10 18.3334M10 18.3334L7.5 15.8334M15.8333 7.50002L18.3333 10M18.3333 10L15.8333 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Icon>
  );
};
