import { QueryClient, DefaultOptions } from '@tanstack/react-query';

// Define default options for all queries and mutations
const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false, // Don't refetch on window focus by default
    staleTime: 1000 * 60 * 5, // Data becomes stale after 5 minutes
    retry: 1, // Only retry failed queries once
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
  },
};

// Create and export the QueryClient with these defaults
export const queryClient = new QueryClient({
  defaultOptions,
});