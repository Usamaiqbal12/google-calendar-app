import React from "react";

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
    />
  </svg>
);

export default ArrowIcon;
