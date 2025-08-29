// src/services/placeSearch/placeDataService.test.ts
import {
  initializePlaceDataService,
  getAllPlaces,
  searchPlacesByName,
  filterPlacesByCategory,
  filterPlacesByPriceRange,
  getPlacesByMinimumRating,
  paginatePlaces,
  isPlaceDataServiceInitialized
} from './placeDataService';
import { Place } from '@/types/place';
import * as placeLoader from './placeLoader';
import { vi } from 'vitest';

// Mock data for testing
const mockPlaces: Place[] = [
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
  },
  {
    id: '3',
    name: 'Nhà hàng Nhật Bản',
    category_items: ['Nhà hàng'],
    category_cuisines: ['Nhật'],
    address: {
      street: '789 Đường DEF',
      district: 'Quận 2',
      city: 'TP. HCM'
    },
    price_range: '200.000đ - 500.000đ',
    rating: '9.1',
    open_times: ['10:00 - 22:00'],
    url: 'https://example.com'
  }
];

// Mock the placeLoader module
vi.mock('./placeLoader', () => ({
  loadPlacesData: vi.fn()
}));

describe('placeDataService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Reset the service state before each test
    (global as any).isInitialized = false;
    (global as any).placesCache = null;
  });

  describe('initializePlaceDataService', () => {
    it('should initialize the service successfully', async () => {
      // Mock the loadPlacesData function to return our mock data
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      
      await initializePlaceDataService();
      
      // Verify that loadPlacesData was called
      expect(placeLoader.loadPlacesData).toHaveBeenCalled();
      
      // Verify that the service is now initialized
      expect(isPlaceDataServiceInitialized()).toBe(true);
    });

    it('should handle initialization errors', async () => {
      // Mock the loadPlacesData function to reject with an error
      (placeLoader.loadPlacesData as any).mockImplementation(() => Promise.reject(new Error('Failed to load data')));
      
      await expect(initializePlaceDataService()).rejects.toThrow('Failed to load places data');
      
      // Verify that the service is not initialized
      expect(isPlaceDataServiceInitialized()).toBe(false);
    });
  });

  describe('getAllPlaces', () => {
    it('should return all places', async () => {
      // Initialize the service before this test
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
      
      const places = getAllPlaces();
      expect(places).toHaveLength(3);
      expect(places[0].name).toBe('Nhà hàng Việt Nam');
    });

    it('should throw error when service is not initialized', () => {
      // Reset the service state
      (global as any).isInitialized = false;
      (global as any).placesCache = null;
      
      expect(() => getAllPlaces()).toThrow('Place data service not initialized');
    });
  });

  describe('searchPlacesByName', () => {
    beforeEach(async () => {
      // Initialize the service before each test in this block
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
    });

    it('should return places matching the search query', () => {
      const results = searchPlacesByName('nhà hàng');
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('Nhà hàng Việt Nam');
      expect(results[1].name).toBe('Nhà hàng Nhật Bản');
    });

    it('should return places matching category items', () => {
      const results = searchPlacesByName('quán cà phê');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Quán cà phê Paris');
    });

    it('should return places matching district', () => {
      const results = searchPlacesByName('quận 1');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Nhà hàng Việt Nam');
    });

    it('should return empty array for empty query', () => {
      const results = searchPlacesByName('');
      expect(results).toHaveLength(0);
    });

    it('should throw error when service is not initialized', () => {
      // Reset the service state
      (global as any).isInitialized = false;
      (global as any).placesCache = null;
      
      expect(() => searchPlacesByName('nhà hàng')).toThrow('Place data service not initialized');
    });
  });

  describe('filterPlacesByCategory', () => {
    beforeEach(async () => {
      // Initialize the service before each test in this block
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
    });

    it('should return places in the specified category', () => {
      const results = filterPlacesByCategory('Nhà hàng');
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('Nhà hàng Việt Nam');
      expect(results[1].name).toBe('Nhà hàng Nhật Bản');
    });

    it('should throw error when service is not initialized', () => {
      // Reset the service state
      (global as any).isInitialized = false;
      (global as any).placesCache = null;
      
      expect(() => filterPlacesByCategory('Nhà hàng')).toThrow('Place data service not initialized');
    });
  });

  describe('filterPlacesByPriceRange', () => {
    beforeEach(async () => {
      // Initialize the service before each test in this block
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
    });

    it('should return places in the specified price range', () => {
      const results = filterPlacesByPriceRange('50.000đ - 200.000đ');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Nhà hàng Việt Nam');
    });

    it('should throw error when service is not initialized', () => {
      // Reset the service state
      (global as any).isInitialized = false;
      (global as any).placesCache = null;
      
      expect(() => filterPlacesByPriceRange('50.000đ - 200.000đ')).toThrow('Place data service not initialized');
    });
  });

  describe('getPlacesByMinimumRating', () => {
    beforeEach(async () => {
      // Initialize the service before each test in this block
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
    });

    it('should return places with rating above the threshold', () => {
      const results = getPlacesByMinimumRating(8.0);
      expect(results).toHaveLength(2);
      expect(results[0].name).toBe('Nhà hàng Việt Nam');
      expect(results[1].name).toBe('Nhà hàng Nhật Bản');
    });

    it('should throw error when service is not initialized', () => {
      // Reset the service state
      (global as any).isInitialized = false;
      (global as any).placesCache = null;
      
      expect(() => getPlacesByMinimumRating(8.0)).toThrow('Place data service not initialized');
    });
  });

  describe('paginatePlaces', () => {
    beforeEach(async () => {
      // Initialize the service before each test in this block
      (placeLoader.loadPlacesData as any).mockResolvedValue(mockPlaces);
      await initializePlaceDataService();
    });

    it('should return paginated results', () => {
      const allPlaces = getAllPlaces();
      const page1 = paginatePlaces(allPlaces, 1, 2);
      const page2 = paginatePlaces(allPlaces, 2, 2);
      
      expect(page1).toHaveLength(2);
      expect(page2).toHaveLength(1);
      expect(page1[0].name).toBe('Nhà hàng Việt Nam');
      expect(page1[1].name).toBe('Quán cà phê Paris');
      expect(page2[0].name).toBe('Nhà hàng Nhật Bản');
    });

    it('should throw error for invalid page parameters', () => {
      const allPlaces = getAllPlaces();
      expect(() => paginatePlaces(allPlaces, 0, 2)).toThrow();
      expect(() => paginatePlaces(allPlaces, 1, 0)).toThrow();
    });
  });
});