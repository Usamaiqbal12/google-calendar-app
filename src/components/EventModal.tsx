import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';

const EventModal: React.FC = () => {
  const { addEvent, setModalOpen } = useCalendar();

  const [title, setTitle] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSave = () => {
    if (new Date(start) > new Date(end)) {
      setError('End date cannot be before start date.');
      return;
    }
    setError('');
    addEvent({ title, start, end, description });
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 z-999 flex justify-center items-center z-50">
      <div className="bg-[#DDE3E9] dark:bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl dark:text-black font-bold mb-4">Create Event</h2>

        <input
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 border-[#DDE3E9] dark:border-[#323537] p-3 bg-white"
          value={title}
          onChange={e => setTitle(e.target.value)}
          id="title"
          placeholder="Event Title"
        />

        <input
          type="datetime-local"
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 border-[#DDE3E9] dark:border-[#323537] p-3 bg-white"
          value={start}
          onChange={e => {
            const newStart = e.target.value;
            setStart(newStart);
            if (end && new Date(newStart) > new Date(end)) {
              setEnd('');
            }
          }}
          id="start-date"
          max={end}
          data-testid="start-date"

        />

        <input
          type="datetime-local"
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 border-[#DDE3E9] dark:border-[#323537] p-3 bg-white"
          value={end}
          onChange={e => setEnd(e.target.value)}
          id="end-date"
          min={start}
          data-testid="end-date"

        />

        <textarea
          id="description"
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 border-[#DDE3E9] dark:border-[#323537] p-3 bg-white"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />

        {error && (
          <p role="alert" className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
        <div className="flex justify-end mt-4 gap-5 space-x-2">
          <button className="btn dark:text-black cursor-pointer" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className="btn-primary dark:text-black cursor-pointer"
            onClick={handleSave}
            disabled={!start || !end} 
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

