import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProperties } from '@/api/properties';
import { Property } from '@/types/database';

// Define filter types for properties
export interface PropertyFilters {
  propertyType?: string;
  maxGuests?: number;
  featured?: boolean;
}

export function useProperties(
  filters?: PropertyFilters,
  options?: UseQueryOptions<Property[], Error, Property[], any[]>
) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => getProperties(filters),
    ...options,
  });
}

// src/features/properties/hooks/useProperty.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getPropertyById } from '@/api/properties';
import { Property } from '@/types/database';

export function useProperty(
  id: string | undefined,
  options?: UseQueryOptions<Property | null, Error, Property | null, any[]>
) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => id ? getPropertyById(id) : null,
    enabled: !!id, // Only run the query if we have an ID
    ...options,
  });
}