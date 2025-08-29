import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Place } from '@/types/place';
import PlaceCard from './PlaceCard';

// Mock place data for testing
const mockPlace: Place = {
  id: '1',
  name: 'Nhà hàng Việt Nam - Phan Phú Tiên',
  category_items: ['Ăn vặt/vỉa hè'],
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

describe('PlaceCard', () => {
  it('should render place information correctly', () => {
    render(<PlaceCard place={mockPlace} />);

    // Check that place name is rendered
    expect(screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên')).toBeInTheDocument();

    // Check that rating is rendered
    expect(screen.getByText('7.1/10')).toBeInTheDocument();

    // Check that price range is rendered
    expect(screen.getByText('Giá không xác định')).toBeInTheDocument();

    // Check that category is rendered
    expect(screen.getByText('Ăn vặt/vỉa hè')).toBeInTheDocument();

    // Check that address is rendered
    expect(screen.getByText('Quận 5, TP. HCM')).toBeInTheDocument();

    // Check that image is rendered with correct src
    const image = screen.getByAltText('Nhà hàng Việt Nam - Phan Phú Tiên');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/photo1.jpg');
  });

  it('should render placeholder image when no photos are available', () => {
    const placeWithoutPhotos = { ...mockPlace, photos: undefined };
    render(<PlaceCard place={placeWithoutPhotos} />);

    const image = screen.getByAltText('Nhà hàng Việt Nam - Phan Phú Tiên');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/placeholder-place.jpg');
  });

  it('should display "Chưa có đánh giá" when rating is not available', () => {
    const placeWithoutRating = { ...mockPlace, rating: '' };
    render(<PlaceCard place={placeWithoutRating} />);

    expect(screen.getByText('Chưa có đánh giá')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<PlaceCard onClick={handleClick} place={mockPlace} />);

    const card = screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên').closest('div');
    if (card) {
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledWith(mockPlace);
    }
  });

  it('should render correctly without category items', () => {
    const placeWithoutCategory = { ...mockPlace, category_items: [] };
    render(<PlaceCard place={placeWithoutCategory} />);

    // Should still render other information
    expect(screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên')).toBeInTheDocument();
    expect(screen.getByText('7.1/10')).toBeInTheDocument();
  });
});