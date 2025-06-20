import React from "react";
import CreateEventButton from "./CreateEventButton";
import CustomDatePicker from "./CustomDatePicker";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`
        bg-[#F7FAFD] dark:bg-[#1B1B1B] border-gray-300 p-4 transition-all duration-300 ease-in-out hidden lg:flex
        ${isOpen ? "w-70" : "w-0 overflow-hidden"}
      `}
    >
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div>
          <CreateEventButton isSidebar />
        </div>
        <CustomDatePicker />
      </div>
    </div>
  );
};

export default Sidebar;
