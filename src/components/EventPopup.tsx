import React from "react";
import { CalendarEvent, useCalendar } from "../context/CalendarContext";
import dayjs from "dayjs";

const normalizeToDate = (value: string | Date | dayjs.Dayjs | undefined): Date => {
  if (!value) return new Date(""); 
  if (dayjs.isDayjs(value)) return value.toDate();
  return new Date(value);
};


const EventPopup: React.FC = () => {
  const { currentEventDt, setCurrentEventDt, setShowDtEventsPopup } = useCalendar();

  const startDate = normalizeToDate(currentEventDt?.start);
  const endDate = normalizeToDate(currentEventDt?.end);
  
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedStart = isNaN(startDate.getTime())
    ? '(invalid date)'
    : startDate.toLocaleString('en-GB', options);

  const formattedEnd = isNaN(endDate.getTime())
    ? '(invalid date)'
    : endDate.toLocaleString('en-GB', options);

  return (
    <div className="fixed inset-0 z-990 bg-opacity-30 flex justify-center items-center">
      <div className="bg-[#DDE3E9] dark:bg-white p-6 rounded shadow-lg w-96">
        <h1 className="text-[36px] text-black">Event Details</h1>

        <h2 className="text-xl font-bold text-black mb-2">
          Title: <span className="font-normal">{currentEventDt?.title ?? "(no title)"}</span>
        </h2>

        <p className="text-lg font-bold text-black mb-1">
          Start: <span className="font-normal">{formattedStart}</span>
        </p>

        <p className="text-lg font-bold text-black mb-1">
          End: <span className="font-normal">{formattedEnd}</span>
        </p>

        {currentEventDt?.description && (
          <p className="text-sm font-bold text-black mt-2">
            Description: <span className="font-normal">{currentEventDt.description}</span>
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="btn btn-primary text-black cursor-pointer"
            onClick={() => {
              setCurrentEventDt({} as CalendarEvent);
              setShowDtEventsPopup(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
