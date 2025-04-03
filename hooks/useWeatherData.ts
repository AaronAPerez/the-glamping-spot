'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Interface for weather forecast data
 */
export interface WeatherForecast {
  date: string;
  weatherCode: string;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
}

/**
 * Interface for parameters used by the useWeatherData hook
 */
interface UseWeatherDataParams {
  /**
   * Geographical coordinates of the location
   */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  
  /**
   * Start date for the forecast
   */
  startDate?: Date;
  
  /**
   * End date for the forecast
   */
  endDate?: Date;
  
  /**
   * Optional custom API endpoint for weather data
   */
  apiEndpoint?: string;
  
  /**
   * Optional API key for weather service
   */
  apiKey?: string;
}

/**
 * Interface for the return value of the useWeatherData hook
 */
interface UseWeatherDataReturn {
  /**
   * Array of weather forecast data
   */
  forecast: WeatherForecast[];
  
  /**
   * Whether data is currently being loaded
   */
  isLoading: boolean;
  
  /**
   * Error message, if any
   */
  error: string | null;
  
  /**
   * Function to manually refresh the weather data
   */
  refreshData: () => Promise<void>;
  
  /**
   * Current season based on date
   */
  currentSeason: 'spring' | 'summer' | 'fall' | 'winter';
}

/**
 * Custom hook for fetching and managing weather forecast data
 * 
 * @example
 * ```tsx
 * const { forecast, isLoading, error } = useWeatherData({
 *   coordinates: { latitude: 37.7749, longitude: -122.4194 },
 *   startDate: new Date(),
 *   endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 * });
 * ```
 */
export function useWeatherData({
  coordinates,
  startDate,
  endDate,
  apiEndpoint = 'https://api.example.com/weather',
  apiKey
}: UseWeatherDataParams): UseWeatherDataReturn {
  // Component state
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sample weather data for demo purposes
  // In a real implementation, this would be removed and replaced with API data
  const sampleWeatherForecast: WeatherForecast[] = [
    {
      date: '2023-07-15',
      weatherCode: 'sunny',
      temperature: { min: 65, max: 82 },
      precipitation: 0,
      windSpeed: 5,
      humidity: 45,
      description: 'Sunny',
      icon: '/images/weather/sunny.svg'
    },
    {
      date: '2023-07-16',
      weatherCode: 'partly-cloudy',
      temperature: { min: 68, max: 80 },
      precipitation: 10,
      windSpeed: 8,
      humidity: 50,
      description: 'Partly Cloudy',
      icon: '/images/weather/partly-cloudy.svg'
    },
    {
      date: '2023-07-17',
      weatherCode: 'rain',
      temperature: { min: 62, max: 72 },
      precipitation: 80,
      windSpeed: 12,
      humidity: 75,
      description: 'Rainy',
      icon: '/images/weather/rain.svg'
    },
    {
      date: '2023-07-18',
      weatherCode: 'cloudy',
      temperature: { min: 60, max: 75 },
      precipitation: 20,
      windSpeed: 10,
      humidity: 65,
      description: 'Cloudy',
      icon: '/images/weather/cloudy.svg'
    },
    {
      date: '2023-07-19',
      weatherCode: 'sunny',
      temperature: { min: 67, max: 83 },
      precipitation: 0,
      windSpeed: 5,
      humidity: 45,
      description: 'Sunny',
      icon: '/images/weather/sunny.svg'
    }
  ];
  
  /**
   * Fetch weather data from API
   */
  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construct the API URL with query parameters
      const params = new URLSearchParams({
        lat: coordinates.latitude.toString(),
        lon: coordinates.longitude.toString(),
      });
      
      if (apiKey) {
        params.append('apiKey', apiKey);
      }
      
      if (startDate) {
        params.append('startDate', startDate.toISOString().split('T')[0]);
      }
      
      if (endDate) {
        params.append('endDate', endDate.toISOString().split('T')[0]);
      }
      
      // In a real app, this would be an actual API call
      // const response = await fetch(`${apiEndpoint}?${params.toString()}`);
      // if (!response.ok) throw new Error('Failed to fetch weather data');
      // const data = await response.json();
      // setForecast(data);
      
      // Using sample data for demo
      setTimeout(() => {
        setForecast(sampleWeatherForecast);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Unable to load weather data. Please try again later.');
      setIsLoading(false);
    }
  }, [coordinates, startDate, endDate, apiEndpoint, apiKey]);
  
  // Fetch weather data on component mount or when dependencies change
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);
  
  /**
   * Determine the current season based on the date
   */
  const getCurrentSeason = useCallback((): 'spring' | 'summer' | 'fall' | 'winter' => {
    const date = startDate || new Date();
    const month = date.getMonth();
    
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }, [startDate]);
  
  return {
    forecast,
    isLoading,
    error,
    refreshData: fetchWeatherData,
    currentSeason: getCurrentSeason()
  };
}