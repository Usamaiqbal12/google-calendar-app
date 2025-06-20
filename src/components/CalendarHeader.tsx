import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useCalendar } from '../context/CalendarContext';
import ThemeToggle from './ThemeToggle';
import Dropdown from './Dropdown';
import ArrowIcon from './svgs/ArrowIcon';
import DropdownArrow from './svgs/DropdownArrow';
import CustomDatePicker from './CustomDatePicker';
import MenuIcon from './svgs/MenuIcon';

const months: Array<'month' | 'week' | 'day'> = ['month', 'week', 'day'];

const CalendarHeader: React.FC = () => {
  const {
    view,
    setView,
    currentDate,
    setCurrentDate,
    setSidebarOpen,
  } = useCalendar();

  const [isShowCalendarPopup, setIsShowCalendarPopup] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowCalendarPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex w-auto lg:w-70 gap-3 gap-lg-4">
        <button onClick={toggleSidebar} className="toggle-btn hidden lg:block">
          <MenuIcon />
        </button>
        <button
          className="border block lg:hidden border-[#747775] h-[40px] lg:h-[48px] w-[75px] lg:w-[90px] py-1 px-2 lg:px-6 rounded-[24px] font-medium text-base hover:bg-[#E7E8EB] transition-colors cursor-pointer dark:hover:text-black"
          onClick={() => setCurrentDate(dayjs())}
        >
          Today
        </button>

        <p className="text-[22px] font-normal">Calendar</p>
        <div className="space-x-5 lg:hidden">
          <Dropdown
            months={months}
            selected={view as 'month' | 'week' | 'day'}
            onChange={(v: 'month' | 'week' | 'day') => setView(v)}
          />
        </div>
      </div>

      <div className="flex w-[100%] items-center justify-between">
        <div className="flex space-x-2 flex gap-5 w-[100%] justify-between">
          <button
            className="border hidden lg:block border-[#747775] h-[48px] w-[90px] py-1 px-6 rounded-[24px] font-medium text-base hover:bg-[#E7E8EB] transition-colors cursor-pointer dark:hover:text-black"
            onClick={() => setCurrentDate(dayjs())}
          >
            Today
          </button>

          <div className="flex gap-7 items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <button
                className="btn rotate-180 cursor-pointer lg:p-2 rounded hover:bg-[#E9ECEF] dark:hover:bg-gray-700 rounded-[9999px]"
                onClick={() => setCurrentDate(currentDate.subtract(1, view))}
              >
                <ArrowIcon />
              </button>
              <button
                className="btn cursor-pointer lg:p-2 hover:bg-[#E9ECEF] dark:hover:bg-gray-700 rounded-[9999px]"
                onClick={() => setCurrentDate(currentDate.add(1, view))}
              >
                <ArrowIcon />
              </button>

              <div
                ref={wrapperRef}
                className="relative cursor-pointer flex items-end gap-2"
                onClick={() => setIsShowCalendarPopup(true)}
              >
                <h2 className="text-base lg:text-[22px] font-normal">
                  {currentDate.format('MMMM YYYY')}
                </h2>
                <div className="mb-1">
                  <DropdownArrow open={false} />
                  {isShowCalendarPopup && (
                    <div className="absolute left-[-40px] z-99">
                      <CustomDatePicker />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="space-x-5 hidden lg:flex w-full justify-end">
          <Dropdown
            months={months}
            selected={view as 'month' | 'week' | 'day'}
            onChange={(v: 'month' | 'week' | 'day') => setView(v)}
          />
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default CalendarHeader;
