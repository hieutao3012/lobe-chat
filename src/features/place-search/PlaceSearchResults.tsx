import { useState, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Place } from '@/types/place';
import { PlaceCard, PlaceList, PlaceDetail } from '@/components/places';

interface PlaceSearchResultsProps {
  places: Place[];
  loading?: boolean;
  onPlaceSelect?: (place: Place) => void;
  onAddToItinerary?: (place: Place) => void;
}

const PlaceSearchResults = ({
  places,
  loading = false,
  onPlaceSelect,
  onAddToItinerary,
}: PlaceSearchResultsProps) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Close detail modal when places change
  useEffect(() => {
    setDetailModalOpen(false);
    setSelectedPlace(null);
  }, [places]);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setDetailModalOpen(true);
    onPlaceSelect?.(place);
  };

  const handleAddToItinerary = (place: Place) => {
    onAddToItinerary?.(place);
    setDetailModalOpen(false);
  };

  // Show loading state
  if (loading) {
    return (
      <Flexbox align={'center'} justify={'center'} style={{ minHeight: 200 }}>
        <div>Đang tải kết quả...</div>
      </Flexbox>
    );
  }

  // Show empty state
  if (!places || places.length === 0) {
    return (
      <Flexbox align={'center'} justify={'center'} style={{ minHeight: 200 }}>
        <div>Không tìm thấy địa điểm phù hợp</div>
      </Flexbox>
    );
  }

  return (
    <Flexbox>
      <PlaceList onPlaceClick={handlePlaceClick} places={places} />
      <PlaceDetail
        onAddToItinerary={handleAddToItinerary}
        open={detailModalOpen}
        place={selectedPlace || undefined}
        onClose={() => setDetailModalOpen(false)}
      />
    </Flexbox>
  );
};

export default PlaceSearchResults;