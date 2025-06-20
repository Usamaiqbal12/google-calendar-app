import { useState, useRef, useEffect } from 'react';
import DropdownArrow from './svgs/DropdownArrow';

interface DropdownProps {
  months: Array<'month' | 'week' | 'day'>;
  selected: 'month' | 'week' | 'day';
  onChange: (value: 'month' | 'week' | 'day') => void;
}

const Dropdown: React.FC<DropdownProps> = ({ months, selected, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="border border-[#747775] h-[40px] lg:h-[48px] w-[100px] lg:w-[120px] flex items-center gap-3 py-1 px-3 lg:px-6 rounded-[24px] font-medium text-base dark:hover:text-black hover:bg-[#E7E8EB] transition-colors cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        {selected}
        <DropdownArrow open={open} />
      </button>

      {open && (
        <ul className="absolute z-1111 mt-2 w-full bg-white border border-[#747775] rounded-lg shadow-lg z-10">
          {months.map(month => (
            <li key={month}>
              <button
                className="w-full text-left rounded-lg px-4 py-2 hover:bg-[#E7E8EB] dark:text-black cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(month);
                  setOpen(false);
                }}
              >
                {month}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
