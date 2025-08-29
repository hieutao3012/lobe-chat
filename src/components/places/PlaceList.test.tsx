import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Place } from '@/types/place';
import PlaceList from './PlaceList';

// Mock place data for testing
const mockPlaces: Place[] = [
  {
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
  },
  {
    id: '2',
    name: 'Quán cà phê Paris',
    category_items: ['Quán cà phê'],
    category_cuisines: ['Âu'],
    address: {
      street: '456 Đường XYZ',
      district: 'Quận 3',
      city: 'TP. HCM',
    },
    price_range: '30.000đ - 100.000đ',
    rating: '7.2',
    open_times: ['07:00 - 23:00', '07:00 - 23:00'],
    url: 'https://www.foody.vn/ho-chi-minh/quan-cafe-paris',
  },
];

describe('PlaceList', () => {
  it('should render a list of place cards', () => {
    render(<PlaceList places={mockPlaces} />);

    // Check that both place names are rendered
    expect(screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên')).toBeInTheDocument();
    expect(screen.getByText('Quán cà phê Paris')).toBeInTheDocument();
  });

  it('should call onPlaceClick handler when a place card is clicked', () => {
    const handlePlaceClick = vi.fn();
    render(<PlaceList onPlaceClick={handlePlaceClick} places={mockPlaces} />);

    // Click on the first place card
    const firstPlaceCard = screen.getByText('Nhà hàng Việt Nam - Phan Phú Tiên').closest('div');
    if (firstPlaceCard) {
      fireEvent.click(firstPlaceCard);
      expect(handlePlaceClick).toHaveBeenCalledWith(mockPlaces[0]);
    }
  });

  it('should render empty list when no places are provided', () => {
    render(<PlaceList places={[]} />);

    // Check that no place cards are rendered
    expect(screen.queryByText('Nhà hàng Việt Nam - Phan Phú Tiên')).not.toBeInTheDocument();
    expect(screen.queryByText('Quán cà phê Paris')).not.toBeInTheDocument();
  });

  it('should render correct number of place cards', () => {
    render(<PlaceList places={mockPlaces} />);

    // Get all elements containing the place names
    const placeCards = screen.getAllByText(/Nhà hàng Việt Nam.*Phan Phú Tiên|Quán cà phê Paris/);
    expect(placeCards).toHaveLength(2);
  });
});