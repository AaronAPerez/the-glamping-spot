"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range"; 
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 

interface BookNowButtonProps {
  isScrolled?: boolean;
}

export default function BookNowButton({ isScrolled = false }: BookNowButtonProps) {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Handle date selection
  const handleSelect = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  // Navigate to properties page with selected dates
  const handleBookNow = () => {
    if (showDatePicker) {
      const startDateStr = dateRange.startDate.toISOString().split('T')[0];
      const endDateStr = dateRange.endDate.toISOString().split('T')[0];
      router.push(`/properties?checkIn=${startDateStr}&checkOut=${endDateStr}`);
    } else {
      setShowDatePicker(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleBookNow}
        className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all ${
          isScrolled
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-emerald-500 hover:bg-emerald-600 text-white"
        }`}
        aria-label="Book your stay now"
        aria-expanded={showDatePicker}
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        <span className="font-medium">Book Now</span>
      </button>

      {showDatePicker && (
        <div className="absolute right-0 mt-2 p-2 bg-white rounded-md shadow-lg z-50">
          <DateRange
            ranges={[dateRange]}
            onChange={handleSelect}
            minDate={new Date()}
            months={1}
            direction="vertical"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setShowDatePicker(false)}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const startDateStr = dateRange.startDate.toISOString().split('T')[0];
                const endDateStr = dateRange.endDate.toISOString().split('T')[0];
                router.push(`/properties?checkIn=${startDateStr}&checkOut=${endDateStr}`);
                setShowDatePicker(false);
              }}
              className="px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}