import React from 'react';
import dayjs from 'dayjs';
import { CalendarEvent, useCalendar } from '../../context/CalendarContext';
import CreateEventButton from '../CreateEventButton';
import useWindowWidth from '../hooks/useWindowWidth';

const SLOT_HEIGHT = 60;

const DayView: React.FC = () => {
  const {
    currentDate,
    events,
    sidebarOpen,
    setModalOpen,
    setShowDtEventsPopup,
    setCurrentEventDt
  } = useCalendar();

  const width = useWindowWidth();
  const isMobile = width <= 1023;

  const hours = Array.from({ length: 24 }, (_, i) =>
    currentDate.startOf('day').add(i, 'hour')
  );

  const getEventStyle = (event: CalendarEvent) => {
    const dayStart = currentDate.startOf('day');
    const dayEnd = currentDate.endOf('day');

    const start = dayjs(event.start);
    const end = dayjs(event.end);

    const eventStart = start.isBefore(dayStart) ? dayStart : start;
    const eventEnd = end.isAfter(dayEnd) ? dayEnd : end;

    const startMinutes = eventStart.diff(dayStart, 'minute');
    const endMinutes = eventEnd.diff(dayStart, 'minute');

    const top = (startMinutes / 60) * SLOT_HEIGHT;
    const height = ((endMinutes - startMinutes) / 60) * SLOT_HEIGHT;

    return { top, height };
  };

  const filteredEvents = events.filter((event: CalendarEvent) => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    return (
      start.isSame(currentDate, 'day') ||
      end.isSame(currentDate, 'day') ||
      (start.isBefore(currentDate.startOf('day')) && end.isAfter(currentDate.endOf('day')))
    );
  });

  return (
    <div className="h-full flex flex-col">
      <div
        className={`border-b border-[#DDE3E9] dark:border-[#323537] p-2 dark:bg-black font-semibold text-lg dark:text-white ${!sidebarOpen || isMobile ? "flex gap-5 items-center" : ""}`}
        onClick={() => setModalOpen(true)}
      >
        {!sidebarOpen || isMobile ? <CreateEventButton /> : null}
        {currentDate.format('dddd, MMM D')}
      </div>

      <div className="flex flex-1 overflow-y-auto">
        <div className="w-16 h-full bg-white dark:bg-black text-xs text-gray-500">
          {hours.map((time, i) => (
            <div
              key={i}
              className="h-[60px] border-r pl-1 pt-1 dark:bg-black border-b border-[#DDE3E9] dark:border-[#323537] text-right pr-1 text-[10px] dark:text-white"
            >
              {time.format('h A')}
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          {hours.map((_, i) => (
            <div
              key={i}
              className="h-[60px] border-b border-[#DDE3E9] dark:border-[#323537] dark:bg-black hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setModalOpen(true)}
            />
          ))}

          {filteredEvents.map((event, i) => {
            const style = getEventStyle(event);
            const leftOffset = i === 0 ? 0 : i * 150;

            return (
              <div
                key={i}
                className="absolute bg-blue-500 p-1 cursor-pointer text-white text-xs rounded shadow-md"
                style={{
                  top: style.top,
                  height: style.height,
                  left: `${leftOffset}px`,
                  right: '2px',
                  boxShadow: '0 4px 10px rgba(255, 255, 255, 0.5)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentEventDt(event);
                  setShowDtEventsPopup(true);
                }}
              >
                {event.title || '(No title)'}
                <div className="text-[10px]">
                  {dayjs(event.start).format('h:mm A')} – {dayjs(event.end).format('h:mm A')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayView;
