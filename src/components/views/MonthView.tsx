import React from "react";
import { CalendarEvent, useCalendar } from '../../context/CalendarContext';
import dayjs, { Dayjs } from 'dayjs';
import CreateEventButton from '../CreateEventButton';
import useWindowWidth from '../hooks/useWindowWidth';

const MonthView: React.FC = () => {
  const width = useWindowWidth();
  const {
    currentDate,
    events,
    setModalOpen,
    sidebarOpen,
    setShowDtEventsPopup,
    setCurrentEventDt,
  } = useCalendar();

  const isMobile = width <= 1023;

  const startOfMonth: Dayjs = currentDate.startOf('month').startOf('week');
  const days: Dayjs[] = Array.from({ length: 35 }, (_, i) =>
    startOfMonth.add(i, 'day')
  );
  const today = dayjs();

  const getEventsForDay = (date: Dayjs): CalendarEvent[] =>
    events.filter((event: CalendarEvent) => {
      const start = dayjs(event.start);
      const end = dayjs(event.end);
      return (
        date.isSame(start, 'day') ||
        (date.isAfter(start, 'day') && date.isBefore(end, 'day')) ||
        date.isSame(end, 'day')
      );
    });

  const MAX_EVENTS_SHOWN = 5;

  const dayLabels: string[] = Array.from({ length: 7 }, (_, i) =>
    dayjs().startOf('week').add(i, 'day').format('ddd')
  );
console.log(events, "events")
  return (
    <div className="h-full rounded-tl-[12px]">
      <div className="grid grid-cols-7 text-xs text-center font-medium text-black dark:bg-black dark:text-white border-b border-[#DDE3E9] dark:border-[#323537]">
        {dayLabels.map((label) => (
          <div key={label} className="p-2">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-5 h-full dark:bg-black">
        {days.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day.isSame(today, 'day');

          return (
            <div
              key={day.toString()}
              className={`relative z-55 border-b border-r border-[#DDE3E9] dark:border-[#323537] p-1 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 flex flex-col ${
                i === 0 ? 'rounded-tl-[12px]' : ''
              } ${
                isToday
                  ? 'bg-blue-50 dark:bg-white dark:hover:text-white dark:text-black'
                  : ''
              }`}
              onClick={() => setModalOpen(true)}
            >
              {i === 0 && (!sidebarOpen || isMobile) && (
                <div className="absolute bottom-[-8px] lg:bottom-[unset]">
                  <CreateEventButton />
                </div>
              )}

              <div
                className={`text-xs text-gray-500 text-center ${
                  isToday ? 'dark:hover:text-white dark:text-black' : 'dark:text-white'
                }`}
              >
                {day.format('D')}
              </div>

              <div className="flex flex-col gap-[2px] mt-1 overflow-hidden">
                {dayEvents.slice(0, MAX_EVENTS_SHOWN).map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-500 p-1 cursor-pointer relative z-99 text-white text-xs rounded truncate"
                    title={event.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentEventDt(event);
                      setShowDtEventsPopup(true);
                    }}
                  >
                    {event.title || '(No title)'}
                  </div>
                ))}

                {dayEvents.length > MAX_EVENTS_SHOWN && (
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    +{dayEvents.length - MAX_EVENTS_SHOWN} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
