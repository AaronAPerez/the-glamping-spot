import { useProperties } from '@/features/properties/hooks/useProperties';
import PropertyCard from '@/components/properties/PropertyCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';

export default function PropertyList() {
  const { data: properties, isLoading, error } = useProperties();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  if (!properties?.length) return <p>No properties found.</p>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}