import React from 'react';
import { useCalendar } from '../context/CalendarContext';

interface CreateEventButtonProps {
  isSidebar?: boolean;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ isSidebar = false }) => {
  const { setModalOpen } = useCalendar();

  return (
    <button
      onClick={() => setModalOpen(true)}
      className={`btn w-max dark:bg-[#37393b] dark:text-white flex gap-5 items-center text-[20px] bg-white rounded-[16px] shadow-xl dark:text-black cursor-pointer dark:hover:bg-[#373B41] hover:bg-[#EDF2FC] ${
        isSidebar ? 'mb-10 px-4 py-3' : 'px-3 py-1'
      }`}
    >
      <span className="text-[24px] font-normal">+</span>
      {isSidebar ? 'Create' : null}
    </button>
  );
};

export default CreateEventButton;
