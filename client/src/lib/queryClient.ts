import { QueryClient } from '@tanstack/react-query';

// Create a query client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Default fetcher function
const defaultFetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// API request helper for mutations
export const apiRequest = async (url: string, options?: RequestInit) => {
  return defaultFetcher(url, options);
};

// Set up the default query function
queryClient.setDefaultOptions({
  queries: {
    queryFn: ({ queryKey }) => {
      const [url] = queryKey as [string, ...unknown[]];
      return defaultFetcher(url);
    },
  },
});