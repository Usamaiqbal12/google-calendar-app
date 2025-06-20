import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import CalendarBody from './components/CalendarBody';

const App: React.FC = () => {
  return (
    <CalendarProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <CalendarBody />
      </div>
    </CalendarProvider>
  );
};

export default App;
