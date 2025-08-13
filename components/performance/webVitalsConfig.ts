// PERFORMANCE MONITORING AND WEB VITALS

export const webVitalsConfig = {
  // Web Vitals reporting
  reportWebVitals: (metric: any) => {
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service
      console.log(metric);
      
      // Integrate with services:
      // - Google Analytics
      // - Vercel Analytics
      // - Custom analytics endpoint
    }
  },
};