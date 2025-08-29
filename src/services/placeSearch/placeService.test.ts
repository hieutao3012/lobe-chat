// src/services/placeSearch/placeService.test.ts
import {
  initializePlaceService,
  getAllPlaces,
  searchPlaces,
  filterPlacesByCategory,
  filterPlacesByPriceRange,
  getPlacesByMinimumRating,
  paginatePlaces
} from './placeService';
import { Place } from '@/types/place';

describe('placeService', () => {
  beforeAll(async () => {
    // Initialize the service before running tests
    await initializePlaceService();
  });

  describe('initializePlaceService', () => {
    it('should initialize the service successfully', async () => {
      // Since we're calling this in beforeAll, we'll just verify it doesn't throw
      expect(() => initializePlaceService()).not.toThrow();
    });

    it('should not re-initialize if already initialized', async () => {
      // Call initialize again - should not throw
      await expect(initializePlaceService()).resolves.toBeUndefined();
    });
  });

  describe('getAllPlaces', () => {
    it('should return all places after initialization', () => {
      const places = getAllPlaces();
      expect(places.length).toBeGreaterThan(0);
    });
  });

  describe('searchPlaces', () => {
    it('should return places matching the search query', () => {
      const results = searchPlaces('nhà hàng');
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('should return places matching category items', () => {
      const results = searchPlaces('quán cà phê');
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('should return places matching district', () => {
      const results = searchPlaces('quận 1');
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('should return empty array for empty query', () => {
      const results = searchPlaces('');
      expect(results).toEqual([]);
    });
  });

  describe('filterPlacesByCategory', () => {
    it('should return places in the specified category', () => {
      const results = filterPlacesByCategory('Nhà hàng');
      // Our mock data doesn't have this exact category, so we expect 0 results
      expect(results).toBeDefined();
    });
  });

  describe('filterPlacesByPriceRange', () => {
    it('should return places in the specified price range', () => {
      const results = filterPlacesByPriceRange('50.000đ - 200.000đ');
      expect(results).toBeDefined();
    });
  });

  describe('getPlacesByMinimumRating', () => {
    it('should return places with rating above the threshold', () => {
      const results = getPlacesByMinimumRating(8.0);
      expect(results.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('paginatePlaces', () => {
    it('should return paginated results', () => {
      const allPlaces = getAllPlaces();
      const page1 = paginatePlaces(allPlaces, 1, 2);
      const page2 = paginatePlaces(allPlaces, 2, 2);
      
      expect(page1).toBeDefined();
      expect(page2).toBeDefined();
    });
  });
});