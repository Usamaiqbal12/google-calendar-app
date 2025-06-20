import React from "react";
import { useCalendar } from "../context/CalendarContext";
import CalendarHeader from "./CalendarHeader";
import EventModal from "./EventModal";
import DayView from "./views/DayView";
import MonthView from "./views/MonthView";
import WeekView from "./views/WeekView";
import Sidebar from "./Sidebar";
import EventPopup from "./EventPopup";

const CalendarBody: React.FC = () => {
  const { view, modalOpen, sidebarOpen, showDtEventsPopup } = useCalendar();

  const renderView = () => {
    switch (view) {
      case "month":
        return <MonthView />;
      case "week":
        return <WeekView />;
      case "day":
        return <DayView />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col lg:flex-row items-center h-32 lg:h-[unset] gap-4 lg:gap-6 h-21 px-2 lg:px-4 py-2 bg-[#F7FAFD] dark:bg-[#1B1B1B]">
        <CalendarHeader />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto border border-[#DDE3E9] dark:border-[#323537] rounded-tl-[12px]">
          {renderView()}
        </div>
      </div>
      {showDtEventsPopup && <EventPopup />}
      {modalOpen && <EventModal />}
    </div>
  );
};

export default CalendarBody;
