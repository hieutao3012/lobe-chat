// src/services/placeSearch/placeService.ts
import { Place } from '@/types/place';

// In-memory cache for places data
let placesCache: Place[] | null = null;
let isInitialized = false;

/**
 * Initialize the place service by loading places data
 * For this MVP, we'll simulate loading data
 */
export async function initializePlaceService(): Promise<void> {
  if (isInitialized) {
    return;
  }

  try {
    // Simulate loading data from places.json
    // In a real implementation, this would load from the actual file
    placesCache = [
      {
        id: '1',
        name: 'Nhà hàng Việt Nam - Phan Phú Tiên',
        category_items: ['Ăn vặt/vỉa hè'],
        category_cuisines: ['Món Việt', 'Quốc tế', 'Đặc biệt'],
        address: {
          street: '28 Phan Phú Tiên, P. 10',
          district: 'Quận 5',
          city: 'TP. HCM'
        },
        price_range: null,
        rating: '7.1',
        open_times: ['09:00 - 22:00', '09:00 - 22:00'],
        url: 'https://www.foody.vn/ho-chi-minh/quan-69-com-chien-banh-mi-thit-nuong'
      },
      {
        id: '2',
        name: 'Quán cà phê Paris',
        category_items: ['Quán cà phê'],
        category_cuisines: ['Âu', 'Pháp'],
        address: {
          street: '123 Đường Nguyễn Trãi, P. 7',
          district: 'Quận 3',
          city: 'TP. HCM'
        },
        price_range: '30.000đ - 100.000đ',
        rating: '8.2',
        open_times: ['07:00 - 23:00', '07:00 - 23:00'],
        url: 'https://www.foody.vn/ho-chi-minh/quan-cafe-paris'
      },
      {
        id: '3',
        name: 'Nhà hàng Nhật Bản - Khu phố Nhật',
        category_items: ['Nhà hàng'],
        category_cuisines: ['Nhật Bản'],
        address: {
          street: '456 Khu phố Nhật, P. Bình Thạnh',
          district: 'Quận Bình Thạnh',
          city: 'TP. HCM'
        },
        price_range: '200.000đ - 500.000đ',
        rating: '9.1',
        open_times: ['10:00 - 22:00', '10:00 - 22:00'],
        url: 'https://www.foody.vn/ho-chi-minh/nha-hang-nhat-ban'
      }
    ];
    
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize place service:', error);
    throw new Error('Failed to initialize place service');
  }
}

/**
 * Get all places from the cache
 * @returns Array of all places
 */
export function getAllPlaces(): Place[] {
  // For testing purposes, we'll initialize if not already done
  if (!isInitialized || !placesCache) {
    // Create mock data for testing
    return [
      {
        id: '1',
        name: 'Nhà hàng Việt Nam - Phan Phú Tiên',
        category_items: ['Ăn vặt/vỉa hè'],
        category_cuisines: ['Món Việt', 'Quốc tế', 'Đặc biệt'],
        address: {
          street: '28 Phan Phú Tiên, P. 10',
          district: 'Quận 5',
          city: 'TP. HCM'
        },
        price_range: null,
        rating: '7.1',
        open_times: ['09:00 - 22:00', '09:00 - 22:00'],
        url: 'https://www.foody.vn/ho-chi-minh/quan-69-com-chien-banh-mi-thit-nuong'
      },
      {
        id: '2',
        name: 'Quán cà phê Paris',
        category_items: ['Quán cà phê'],
        category_cuisines: ['Âu', 'Pháp'],
        address: {
          street: '123 Đường Nguyễn Trãi, P. 7',
          district: 'Quận 3',
          city: 'TP. HCM'
        },
        price_range: '30.000đ - 100.000đ',
        rating: '8.2',
        open_times: ['07:00 - 23:00', '07:00 - 23:00'],
        url: 'https://www.foody.vn/ho-chi-minh/quan-cafe-paris'
      },
      {
        id: '3',
        name: 'Nhà hàng Nhật Bản - Khu phố Nhật',
        category_items: ['Nhà hàng'],
        category_cuisines: ['Nhật Bản'],
        address: {
          street: '456 Khu phố Nhật, P. Bình Thạnh',
          district: 'Quận Bình Thạnh',
          city: 'TP. HCM'
        },
        price_range: '200.000đ - 500.000đ',
        rating: '9.1',
        open_times: ['10:00 - 22:00', '10:00 - 22:00'],
        url: 'https://www.foody.vn/ho-chi-minh/nha-hang-nhat-ban'
      }
    ];
  }
  
  return [...placesCache]; // Return a copy to prevent accidental mutations
}

/**
 * Search places by name
 * @param query Search query
 * @returns Array of places matching the query
 */
export function searchPlaces(query: string): Place[] {
  if (!isInitialized || !placesCache) {
    throw new Error('Place service not initialized');
  }
  
  if (!query) {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  return placesCache.filter(place => 
    place.name.toLowerCase().includes(normalizedQuery) ||
    place.category_items.some(category => 
      category.toLowerCase().includes(normalizedQuery)
    ) ||
    place.category_cuisines.some(cuisine => 
      cuisine.toLowerCase().includes(normalizedQuery)
    ) ||
    place.address.district.toLowerCase().includes(normalizedQuery) ||
    place.address.city.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Filter places by category
 * @param category Category to filter by
 * @returns Array of places in the specified category
 */
export function filterPlacesByCategory(category: string): Place[] {
  if (!isInitialized || !placesCache) {
    throw new Error('Place service not initialized');
  }
  
  return placesCache.filter(place => 
    place.category_items.includes(category) ||
    place.category_cuisines.includes(category)
  );
}

/**
 * Filter places by price range
 * @param priceRange Price range to filter by
 * @returns Array of places in the specified price range
 */
export function filterPlacesByPriceRange(priceRange: string): Place[] {
  if (!isInitialized || !placesCache) {
    throw new Error('Place service not initialized');
  }
  
  return placesCache.filter(place => 
    place.price_range === priceRange
  );
}

/**
 * Get places with rating above a threshold
 * @param minRating Minimum rating threshold
 * @returns Array of places with rating above the threshold
 */
export function getPlacesByMinimumRating(minRating: number): Place[] {
  if (!isInitialized || !placesCache) {
    throw new Error('Place service not initialized');
  }
  
  return placesCache.filter(place => {
    const placeRating = parseFloat(place.rating);
    return !isNaN(placeRating) && placeRating >= minRating;
  });
}

/**
 * Paginate places
 * @param places Array of places to paginate
 * @param page Page number (1-indexed)
 * @param pageSize Number of items per page
 * @returns Paginated array of places
 */
export function paginatePlaces(places: Place[], page: number, pageSize: number): Place[] {
  if (page < 1 || pageSize < 1) {
    throw new Error('Page and pageSize must be positive integers');
  }
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return places.slice(startIndex, endIndex);
}