import React from "react";

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {}

const MenuIcon: React.FC<MenuIconProps> = (props) => (
  <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
  </svg>
);

export default MenuIcon;
