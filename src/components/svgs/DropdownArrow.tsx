import React from "react";

interface DropdownArrowProps {
  open?: boolean;
}

const DropdownArrow: React.FC<DropdownArrowProps> = ({ open = false }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="m6 8 4 4 4-4" />
  </svg>
);

export default DropdownArrow;
