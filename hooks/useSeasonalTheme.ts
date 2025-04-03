'use client';

import { useState, useEffect } from 'react';

/**
 * Interface for theme colors and styles
 */
export interface Theme {
  /**
   * Primary color (used for main elements, buttons, etc.)
   */
  primary: string;
  
  /**
   * Secondary color (used for accents, hover states)
   */
  secondary: string;
  
  /**
   * Accent color (used for highlights)
   */
  accent: string;
  
  /**
   * Background gradient or color
   */
  background: string;
  
  /**
   * Primary text color
   */
  textPrimary: string;
  
  /**
   * Secondary text color (for less important text)
   */
  textSecondary: string;
}

/**
 * Available seasons
 */
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

/**
 * Hook that provides theme colors based on current season
 * and manages seasonal preferences
 */
export function useSeasonalTheme() {
  // State for current season
  const [currentSeason, setCurrentSeason] = useState<Season>('spring');
  
  // Define theme colors for each season
  const seasonalThemes: Record<Season, Theme> = {
    spring: {
      primary: 'emerald-600',
      secondary: 'emerald-700',
      accent: 'emerald-400',
      background: 'from-emerald-50 to-white',
      textPrimary: 'gray-900',
      textSecondary: 'gray-700'
    },
    summer: {
      primary: 'blue-600',
      secondary: 'blue-700',
      accent: 'blue-400',
      background: 'from-blue-50 to-white',
      textPrimary: 'gray-900',
      textSecondary: 'gray-700'
    },
    fall: {
      primary: 'amber-600',
      secondary: 'amber-700',
      accent: 'amber-400',
      background: 'from-amber-50 to-white',
      textPrimary: 'gray-900',
      textSecondary: 'gray-700'
    },
    winter: {
      primary: 'indigo-600',
      secondary: 'indigo-700',
      accent: 'indigo-400',
      background: 'from-indigo-50 to-white',
      textPrimary: 'gray-900',
      textSecondary: 'gray-700'
    }
  };
  
  // Determine current season based on date
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    
    if (month >= 2 && month <= 4) {
      setCurrentSeason('spring');
    } else if (month >= 5 && month <= 7) {
      setCurrentSeason('summer');
    } else if (month >= 8 && month <= 10) {
      setCurrentSeason('fall');
    } else {
      setCurrentSeason('winter');
    }
  }, []);
  
  // Get theme based on current season
  const theme = seasonalThemes[currentSeason];
  
  return {
    theme,
    currentSeason,
    setCurrentSeason
  };
}