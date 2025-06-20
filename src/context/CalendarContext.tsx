import React, { createContext, useState, useContext, ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export interface CalendarEvent {
  title?: string;
  start: string | Date | Dayjs;
  end: string | Date | Dayjs;
  description?: string;
  [key: string]: any;
}
interface CalendarContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  currentDate: Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showDtEventsPopup: boolean;
  setShowDtEventsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  currentEventDt: CalendarEvent;
  setCurrentEventDt: React.Dispatch<React.SetStateAction<CalendarEvent>>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [view, setView] = useState<string>('month');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [showDtEventsPopup, setShowDtEventsPopup] = useState<boolean>(false);
  const [currentEventDt, setCurrentEventDt] = useState<CalendarEvent>({ start: '', end: '' });

  const addEvent = (event: CalendarEvent) => setEvents(prev => [...prev, event]);

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        currentDate,
        setCurrentDate,
        events,
        addEvent,
        selectedEvent,
        setSelectedEvent,
        modalOpen,
        setModalOpen,
        sidebarOpen,
        setSidebarOpen,
        showDtEventsPopup,
        setShowDtEventsPopup,
        currentEventDt,
        setCurrentEventDt
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
