// src/services/placeSearch/placeLoader.test.ts
import { loadPlacesData } from './placeLoader';
import { vi } from 'vitest';

// Mock data that matches the structure of places.json
const mockPlacesData = [
  {
    id: '1',
    name: 'Nhà hàng Việt Nam',
    category_items: ['Nhà hàng'],
    category_cuisines: ['Món Việt'],
    address: {
      street: '123 Đường ABC',
      district: 'Quận 1',
      city: 'TP. HCM'
    },
    price_range: '50.000đ - 200.000đ',
    rating: '8.5',
    open_times: ['08:00 - 22:00'],
    url: 'https://example.com'
  },
  {
    id: '2',
    name: 'Quán cà phê Paris',
    category_items: ['Quán cà phê'],
    category_cuisines: ['Âu'],
    address: {
      street: '456 Đường XYZ',
      district: 'Quận 3',
      city: 'TP. HCM'
    },
    price_range: '30.000đ - 100.000đ',
    rating: '7.2',
    open_times: ['07:00 - 23:00'],
    url: 'https://example.com'
  }
];

describe('placeLoader', () => {
  describe('loadPlacesData', () => {
    beforeEach(() => {
      // Reset mocks before each test
      global.fetch = vi.fn();
    });

    it('should load and transform places data successfully', async () => {
      // Mock the fetch response
      (global.fetch as any).mockResolvedValue({
        json: () => Promise.resolve(mockPlacesData)
      });

      const result = await loadPlacesData();

      expect(global.fetch).toHaveBeenCalledWith('/data/places.json');
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '1',
        name: 'Nhà hàng Việt Nam',
        category_items: ['Nhà hàng'],
        category_cuisines: ['Món Việt'],
        address: {
          street: '123 Đường ABC',
          district: 'Quận 1',
          city: 'TP. HCM'
        },
        price_range: '50.000đ - 200.000đ',
        rating: '8.5',
        open_times: ['08:00 - 22:00'],
        url: 'https://example.com'
      });
    });

    it('should handle missing fields in place data', async () => {
      const incompletePlaceData = [
        {
          name: 'Nhà hàng Việt Nam',
          // Missing id, category_items, etc.
        }
      ];

      (global.fetch as any).mockResolvedValue({
        json: () => Promise.resolve(incompletePlaceData)
      });

      const result = await loadPlacesData();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '0', // Generated ID
        name: 'Nhà hàng Việt Nam',
        category_items: [],
        category_cuisines: [],
        address: {
          street: '',
          district: '',
          city: ''
        },
        price_range: null,
        rating: '0',
        open_times: [],
        url: ''
      });
    });

    it('should handle fetch errors', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      await expect(loadPlacesData()).rejects.toThrow('Failed to load places data');
    });

    it('should handle JSON parsing errors', async () => {
      (global.fetch as any).mockResolvedValue({
        json: () => Promise.reject(new Error('Invalid JSON'))
      });

      await expect(loadPlacesData()).rejects.toThrow('Failed to load places data');
    });
  });
});