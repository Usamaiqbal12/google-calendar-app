import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import EventModal from '../components/EventModal';
import { useCalendar } from '../context/CalendarContext';

// Mock useCalendar
jest.mock('../context/CalendarContext', () => ({
  useCalendar: jest.fn(),
}));

describe('EventModal', () => {
  const mockAddEvent = jest.fn();
  const mockSetModalOpen = jest.fn();

  beforeEach(() => {
    useCalendar.mockReturnValue({
      addEvent: mockAddEvent,
      setModalOpen: mockSetModalOpen,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input fields and buttons', () => {
    render(<EventModal />);
    expect(screen.getByPlaceholderText('Event Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('shows error if end date is before start date', async () => {
    render(<EventModal />);
    fireEvent.change(screen.getByTestId('start-date'), {
      target: { value: '2025-06-20T10:00' },
    });
    fireEvent.change(screen.getByTestId('end-date'), {
      target: { value: '2025-06-19T09:00' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(await screen.findByRole('alert')).toHaveTextContent(/end date cannot be before start date/i);
    expect(mockAddEvent).not.toHaveBeenCalled();
  });

  test('save button is disabled when start or end date is missing', () => {
    render(<EventModal />);
    
    // Initially disabled
    expect(screen.getByText('Save')).toBeDisabled();
    
    // Only start date filled
    fireEvent.change(screen.getByTestId('start-date'), {
      target: { value: '2025-06-19T09:00' },
    });
    expect(screen.getByText('Save')).toBeDisabled();
    
    // Only end date filled
    fireEvent.change(screen.getByTestId('start-date'), { target: { value: '' } });
    fireEvent.change(screen.getByTestId('end-date'), {
      target: { value: '2025-06-19T10:00' },
    });
    expect(screen.getByText('Save')).toBeDisabled();
    
    // Both filled - enabled
    fireEvent.change(screen.getByTestId('start-date'), {
      target: { value: '2025-06-19T09:00' },
    });
    expect(screen.getByText('Save')).toBeEnabled();
  });

  test('save button is enabled even when end date is before start date', () => {
    render(<EventModal />);
    
    fireEvent.change(screen.getByTestId('start-date'), {
      target: { value: '2025-06-20T10:00' },
    });
    fireEvent.change(screen.getByTestId('end-date'), {
      target: { value: '2025-06-19T09:00' },
    });

    expect(screen.getByText('Save')).toBeEnabled();
  });

  test('calls addEvent and closes modal on valid save', () => {
    render(<EventModal />);

    fireEvent.change(screen.getByPlaceholderText('Event Title'), {
      target: { value: 'Test Event' },
    });
    fireEvent.change(screen.getByTestId('start-date'), {
      target: { value: '2025-06-19T09:00' },
    });
    fireEvent.change(screen.getByTestId('end-date'), {
      target: { value: '2025-06-19T10:00' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'This is a test' },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(mockAddEvent).toHaveBeenCalledWith({
      title: 'Test Event',
      start: '2025-06-19T09:00',
      end: '2025-06-19T10:00',
      description: 'This is a test',
    });

    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});