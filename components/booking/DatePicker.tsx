'use client';

import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { addDays, isBefore } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

/**
 * Date range picker component for booking functionality
 * Allows selection of check-in and check-out dates with validation
 */
type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  minNights?: number;
  maxNights?: number;
  disabledDates?: Date[];
  ariaDescribedBy?: string;
};

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minNights = 1,
  maxNights = 14,
  disabledDates = [],
  ariaDescribedBy
}: DateRangePickerProps) {
  
  // Function to highlight the date range
  const highlightDateRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  // Function to disable unavailable dates
  const isDateBlocked = (date: Date) => {
    // Disable dates before today
    if (isBefore(date, new Date().setHours(0, 0, 0, 0))) return true;

    // Check if date is in disabledDates array
    return disabledDates.some(disabledDate => 
      date.getFullYear() === disabledDate.getFullYear() &&
      date.getMonth() === disabledDate.getMonth() &&
      date.getDate() === disabledDate.getDate()
    );
  };

  // Enforce minimum and maximum nights
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    
    // If we're selecting an end date
    if (start && end) {
      const daysDifference = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // If shorter than minimum nights
      if (daysDifference < minNights) {
        onChange([start, addDays(start, minNights)]);
        return;
      }
      
      // If longer than maximum nights
      if (daysDifference > maxNights) {
        onChange([start, addDays(start, maxNights)]);
        return;
      }
    }
    
    onChange(dates);
  };

  // Generate unique ID for accessibility
  const datePickerId = React.useId();

  return (
    <div className="w-full">
      <div id={`date-picker-label-${datePickerId}`} className="sr-only">
        Select check-in and check-out dates
      </div>
      <ReactDatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2}
        minDate={new Date()}
        dayClassName={date => 
          highlightDateRange(date) ? "bg-emerald-100 rounded-md" : ""
        }
        filterDate={date => !isDateBlocked(date)}
        calendarClassName="border border-gray-200 rounded-lg shadow-md"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
        aria-labelledby={`date-picker-label-${datePickerId}`}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
}
