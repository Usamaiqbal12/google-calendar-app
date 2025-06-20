import React from 'react';
import dayjs from 'dayjs';
import { CalendarEvent, useCalendar } from '../../context/CalendarContext';
import CreateEventButton from '../CreateEventButton';
import useWindowWidth from '../hooks/useWindowWidth';

const WeekView: React.FC = () => {
  const {
    currentDate,
    events,
    sidebarOpen,
    setModalOpen,
    setShowDtEventsPopup,
    setCurrentEventDt,
  } = useCalendar();

  const width = useWindowWidth();
  const isMobile = width <= 1023;

  const startOfWeek = currentDate.startOf('week');
  const endOfWeek = currentDate.endOf('week');
  const today = dayjs();

  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  const hours = Array.from({ length: 24 }, (_, i) => dayjs().hour(i).minute(0).format('h:mm A'));

  const allDayEvents = events.filter(event => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    return (
      start.startOf('day').isBefore(end.endOf('day')) &&
      (end.diff(start, 'hour') >= 24 || start.hour() === 0 && end.hour() === 0)
    );
  });

  const timedEvents = events.filter(event => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    return !(end.diff(start, 'hour') >= 24);
  });

  const renderAllDayEvent = (event: CalendarEvent, index: number) => {
    const start = dayjs(event.start).isBefore(startOfWeek)
      ? startOfWeek
      : dayjs(event.start).startOf('day');
    const end = dayjs(event.end).isAfter(endOfWeek)
      ? endOfWeek
      : dayjs(event.end).startOf('day');

    const leftIndex = start.diff(startOfWeek, 'day');
    const spanDays = end.diff(start, 'day') + 1;

    return (
      <div
        key={index}
        className="absolute top-0 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow cursor-pointer truncate"
        style={{
          left: `${(leftIndex / 7) * 100}%`,
          width: `${(spanDays / 7) * 100}%`,
          height: '28px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentEventDt(event);
          setShowDtEventsPopup(true);
        }}
        title={`${dayjs(event.start).format('MMM D')} → ${dayjs(event.end).format('MMM D')}`}
      >
        {event.title || '(No title)'}
      </div>
    );
  };

  const renderTimedEvent = (event: CalendarEvent, index: number) => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    const dayIndex = start.diff(startOfWeek, 'day');

    const startMinutes = start.diff(start.startOf('day'), 'minute');
    const endMinutes = end.diff(end.startOf('day'), 'minute');
    const durationMinutes = endMinutes - startMinutes;

    return (
      <div
        key={index}
        className="absolute z-20 bg-blue-500 text-white text-xs px-1 py-0.5 rounded shadow cursor-pointer"
        style={{
          top: `${(startMinutes / (24 * 60)) * 100}%`,
          height: `${(durationMinutes / (24 * 60)) * 100}%`,
          left: `${(dayIndex / 7) * 100}%`,
          width: `${100 / 7}%`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentEventDt(event);
          setShowDtEventsPopup(true);
        }}
        title={`${start.format('MMM D h:mm A')} - ${end.format('MMM D h:mm A')}`}
      >
        {event.title || '(No title)'}
      </div>
    );
  };

  return (
    <div className="relative grid grid-cols-[60px_repeat(7,1fr)] h-full text-xs">
      <div className={`border-r border-b border-[#DDE3E9] dark:border-[#323537]  p-1 bg-white dark:bg-black ${!sidebarOpen || isMobile ? '' : ''}`}>
        {!sidebarOpen || isMobile ? <CreateEventButton /> : null}
      </div>

      {days.map((day, idx) => {
        const isToday = day.isSame(today, 'day');
        return (
          <div
            key={idx}
            className={`border-b border-r text-center cursor-pointer p-2 border-[#DDE3E9] dark:border-[#323537]  ${isToday ? 'bg-blue-50 dark:bg-white' : 'bg-white dark:bg-black'}`}
            onClick={() => setModalOpen(true)}
          >
            <div className={`font-semibold ${isToday ? 'text-blue-600 dark:text-black' : 'dark:text-white'}`}>
              {day.format('ddd D')}
            </div>
          </div>
        );
      })}
      {hours.map((hour, hourIdx) => (
        <React.Fragment key={hourIdx}>
          <div className="border-r border-b border-[#DDE3E9] dark:border-[#323537] text-right pr-1 pt-1 text-gray-400 dark:text-white bg-white dark:bg-black text-[10px]">
            {hour}
          </div>
          {days.map((_, dayIdx) => (
            <div
              key={`${hourIdx}-${dayIdx}`}
              className="border-b border-r border-[#DDE3E9] dark:border-[#323537] h-[60px] hover:bg-blue-50 dark:hover:bg-gray-700 dark:bg-black"
              onClick={() => setModalOpen(true)}
            />
          ))}
        </React.Fragment>
      ))}
      {events.length >= 1 ?  <>     <div className="absolute top-[32px] left-[60px] right-0 h-[28px]">
        {allDayEvents.map(renderAllDayEvent)}
      </div> 
      <div className="absolute top-[60px] left-[60px] right-0 bottom-0">
        {timedEvents.map(renderTimedEvent)}
      </div>
      </> : null}


    </div>
  );
};

export default WeekView;
