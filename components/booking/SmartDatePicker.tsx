'use client';

import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { addDays, isBefore, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useWeatherData } from '../../hooks/useWeatherData';
import { cn } from '@/lib/utils';

type SmartDateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  minNights?: number;
  maxNights?: number;
  disabledDates?: Date[];
  locationCoordinates: {
    latitude: number;
    longitude: number;
  };
  ariaDescribedBy?: string;
};

export default function SmartDateRangePicker({
  startDate,
  endDate,
  onChange,
  minNights = 1,
  maxNights = 14,
  disabledDates = [],
  locationCoordinates,
  ariaDescribedBy
}: SmartDateRangePickerProps) {
  // Get weather data for intelligent date recommendations
  const { forecast, isLoading } = useWeatherData({
    coordinates: locationCoordinates,
    startDate: new Date(),
    endDate: addDays(new Date(), 14), // Look 2 weeks ahead
  });
  
  // Calculate recommended dates based on weather
  const [recommendedDates, setRecommendedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (forecast.length > 0) {
      // Find dates with good weather (no rain, comfortable temperature)
      const goodWeatherDates = forecast
        .filter(day => 
          day.precipitation < 20 && // Low chance of rain
          day.temperature.max < 85 && // Not too hot
          day.temperature.max > 65    // Not too cold
        )
        .map(day => new Date(day.date));
      
      setRecommendedDates(goodWeatherDates);
    }
  }, [forecast]);
  
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
      
      {isLoading ? (
        <div className="flex justify-center py-6">
          <div className="h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="sr-only">Loading weather recommendations...</span>
        </div>
      ) : (
        <div className="mb-2">
          {recommendedDates.length > 0 && (
            <div className="text-sm text-emerald-700 bg-emerald-50 p-2 rounded-md mb-2 flex items-center">
              <svg className="h-5 w-5 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>Tip:</strong> Dates with a green highlight have ideal weather forecasted.
              </span>
            </div>
          )}
        </div>
      )}
      
      <ReactDatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2}
        minDate={new Date()}
        dayClassName={date => {
          // Check if this is a recommended date based on weather
          const isRecommendedDate = recommendedDates.some(
            recDate => 
              date.getDate() === recDate.getDate() && 
              date.getMonth() === recDate.getMonth() && 
              date.getFullYear() === recDate.getFullYear()
          );
          
          
          // Apply styles based on selection state and recommendation
          if (highlightDateRange(date)) {
            return "bg-emerald-100 hover:bg-emerald-200 rounded-md";
          } else if (isRecommendedDate) {
            return "bg-green-50 border border-green-200 hover:bg-green-100 rounded-md text-green-700";
          }
          return "";
        }}
        filterDate={date => !isDateBlocked(date)}
        calendarClassName="border border-gray-200 rounded-lg shadow-md"
        aria-labelledby={`date-picker-label-${datePickerId}`}
        aria-describedby={ariaDescribedBy}
        renderDayContents={(day, date) => (
          <>
            <span>{day}</span>
            {/* Add small weather icon for recommended dates */}
            {recommendedDates.some(
              recDate => 
                date?.getDate() === recDate.getDate() && 
                date?.getMonth() === recDate.getMonth() && 
                date?.getFullYear() === recDate.getFullYear()
            ) && (
              <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto mt-1" aria-hidden="true" />
            )}
          </>
        )}
      />
      
      {/* Key for date indicators */}
      <div className="mt-2 flex items-center text-xs text-gray-500 justify-end">
        <span className="flex items-center mr-3">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></span>
          Ideal weather
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 bg-emerald-100 rounded-full mr-1"></span>
          Selected range
        </span>
      </div>
    </div>
  );
}