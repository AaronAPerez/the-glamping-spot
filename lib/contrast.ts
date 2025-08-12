// 10. CONTRAST AND COLOR UTILITIES

export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In real implementation, use a proper color library
  return 4.5; // Placeholder - should meet WCAG AA
};

export const ensureContrast = (textColor: string, backgroundColor: string): string => {
  const ratio = getContrastRatio(textColor, backgroundColor);
  if (ratio < 4.5) {
    // Return a color with better contrast
    return backgroundColor === '#ffffff' ? '#111827' : '#ffffff';
  }
  return textColor;
};
