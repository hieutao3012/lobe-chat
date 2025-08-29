'use client';

import { useState, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { Place } from '@/types/place';
import { PlaceSearchResults } from '@/features/place-search';

// Mock data for demonstration
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
    photos: ['https://example.com/photo1.jpg'],
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
    photos: ['https://example.com/photo2.jpg'],
  },
  {
    id: '3',
    name: 'Nhà hàng Nhật Bản',
    category_items: ['Nhà hàng'],
    category_cuisines: ['Nhật'],
    address: {
      street: '789 Đường DEF',
      district: 'Quận 2',
      city: 'TP. HCM',
    },
    price_range: '200.000đ - 500.000đ',
    rating: '9.1',
    open_times: ['10:00 - 22:00', '10:00 - 22:00'],
    url: 'https://www.foody.vn/ho-chi-minh/nha-hang-nhat-ban',
    photos: ['https://example.com/photo3.jpg'],
  },
];

export default function PlaceSearchDemo() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlaces(mockPlaces);
      setLoading(false);
    };

    loadData();
  }, []);

  const handlePlaceSelect = (place: Place) => {
    console.log('Selected place:', place);
    alert(`Bạn đã chọn: ${place.name}`);
  };

  const handleAddToItinerary = (place: Place) => {
    console.log('Added to itinerary:', place);
    alert(`Đã thêm "${place.name}" vào lịch trình`);
  };

  return (
    <Flexbox align={'center'} padding={24} style={{ minHeight: '100vh' }} width={'100%'}>
      <h1>Demo Tìm Kiếm Địa Điểm</h1>
      <p>Trang demo để hiển thị chức năng tìm kiếm địa điểm đã được triển khai</p>
      
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <PlaceSearchResults
          loading={loading}
          onAddToItinerary={handleAddToItinerary}
          onPlaceSelect={handlePlaceSelect}
          places={places}
        />
      </div>
    </Flexbox>
  );
}