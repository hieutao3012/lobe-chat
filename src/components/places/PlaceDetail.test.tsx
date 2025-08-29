import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Place } from '@/types/place';
import PlaceDetail from './PlaceDetail';

// Mock place data for testing
const mockPlace: Place = {
  id: '1',
  name: 'Nhà hàng Việt Nam - Phan Phú Tiên',
  category_items: ['Ăn vặt/vỉa hè', 'Nhà hàng'],
  category_cuisines: ['Món Việt', 'Quốc tế', 'Đặc biệt'],
  address: {
    street: '28 Phan Phú Tiên, P. 10',
    district: 'Quận 5',
    city: 'TP. HCM',
  },
  price_range: null,
  rating: '7.1',
  open_times: ['09:00 - 22:00', '09:00 - 22:00'],
  url: 'https://www.foody.vn/ho-chi-minh/quan-69-com-chien-banh-mi-thit-nuong',
  photos: ['https://example.com/photo1.jpg'],
};

describe('PlaceDetail', () => {
  it('should render place details correctly when open and place is provided', () => {
    render(<PlaceDetail open={true} place={mockPlace} onClose={vi.fn()} />);

    // Check that place name is rendered
    expect(screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên')).toBeInTheDocument();

    // Check that rating is rendered
    expect(screen.getByText('7.1/10')).toBeInTheDocument();

    // Check that price range is rendered
    expect(screen.getByText('Giá không xác định')).toBeInTheDocument();

    // Check that categories are rendered
    expect(screen.getByText('Ăn vặt/vỉa hè')).toBeInTheDocument();
    expect(screen.getByText('Nhà hàng')).toBeInTheDocument();

    // Check that address is rendered
    expect(
      screen.getByText('28 Phan Phú Tiên, P. 10, Quận 5, TP. HCM'),
    ).toBeInTheDocument();

    // Check that cuisine types are rendered
    expect(screen.getByText('Món Việt, Quốc tế, Đặc biệt')).toBeInTheDocument();

    // Check that open times are rendered
    const openTimes = screen.getAllByText('09:00 - 22:00');
    expect(openTimes).toHaveLength(2);

    // Check that image is rendered with correct src
    const image = screen.getByAltText('Nhà hàng Việt Nam - Phan Phú Tiên');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/photo1.jpg');
  });

  it('should not render when open is false', () => {
    render(<PlaceDetail open={false} place={mockPlace} onClose={vi.fn()} />);

    // Check that place name is not rendered
    expect(screen.queryByText('Nhà hàng Việt Nam - Phan Phú Tiên')).not.toBeInTheDocument();
  });

  it('should not render when place is not provided', () => {
    render(<PlaceDetail open={true} onClose={vi.fn()} />);

    // Since we're not providing a place, nothing should be rendered
    // This test ensures that the component handles undefined place gracefully
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<PlaceDetail open={true} place={mockPlace} onClose={handleClose} />);

    // Find and click the close button (Modal's default close button)
    const closeButton = document.querySelector('.ant-modal-close');
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('should call onAddToItinerary when "Thêm vào lịch trình" button is clicked', () => {
    const handleAddToItinerary = vi.fn();
    render(
      <PlaceDetail
        onAddToItinerary={handleAddToItinerary}
        open={true}
        place={mockPlace}
        onClose={vi.fn()}
      />,
    );

    // Click the "Thêm vào lịch trình" button
    const addButton = screen.getByText('Thêm vào lịch trình');
    fireEvent.click(addButton);
    expect(handleAddToItinerary).toHaveBeenCalledWith(mockPlace);
  });

  it('should render placeholder image when no photos are available', () => {
    const placeWithoutPhotos = { ...mockPlace, photos: undefined };
    render(<PlaceDetail open={true} place={placeWithoutPhotos} onClose={vi.fn()} />);

    const image = screen.getByAltText('Nhà hàng Việt Nam - Phan Phú Tiên');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/placeholder-place.jpg');
  });

  it('should display "Chưa có đánh giá" when rating is not available', () => {
    const placeWithoutRating = { ...mockPlace, rating: '' };
    render(<PlaceDetail open={true} place={placeWithoutRating} onClose={vi.fn()} />);

    expect(screen.getByText('Chưa có đánh giá')).toBeInTheDocument();
  });
});