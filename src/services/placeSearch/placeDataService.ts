// src/services/placeSearch/placeDataService.ts
import { Place } from '@/types/place';
import { loadPlacesData } from './placeLoader';

// Keep state on globalThis so tests can reset between cases
function getGlobalState() {
  const g = globalThis as any;
  if (typeof g.isInitialized === 'undefined') g.isInitialized = false;
  if (typeof g.placesCache === 'undefined') g.placesCache = null as Place[] | null;
  return g as { isInitialized: boolean; placesCache: Place[] | null };
}

/**
 * Initialize the place data service by loading places from the JSON file
 * @returns Promise that resolves when initialization is complete
 */
export async function initializePlaceDataService(): Promise<void> {
  const g = getGlobalState();
  if (g.isInitialized) return;

  try {
    const placesData = await loadPlacesData();
    g.placesCache = placesData;
    g.isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize place data service:', error);
    throw new Error('Failed to load places data');
  }
}

/**
 * Check if the place data service is initialized
 * @returns Boolean indicating if the service is initialized
 */
export function isPlaceDataServiceInitialized(): boolean {
  const g = getGlobalState();
  return g.isInitialized;
}

/**
 * Get all places from the cache
 * @returns Array of all places
 */
export function getAllPlaces(): Place[] {
  const g = getGlobalState();
  if (!g.isInitialized || !g.placesCache) {
    throw new Error('Place data service not initialized');
  }

  return [...g.placesCache];
}

/**
 * Search places by name
 * @param query Search query
 * @returns Array of places matching the query
 */
export function searchPlacesByName(query: string): Place[] {
  const g = getGlobalState();
  if (!g.isInitialized || !g.placesCache) {
    throw new Error('Place data service not initialized');
  }

  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();
  return g.placesCache.filter((place) =>
    place.name.toLowerCase().includes(normalizedQuery) ||
    place.category_items.some((category) => category.toLowerCase().includes(normalizedQuery)) ||
    place.category_cuisines.some((cuisine) => cuisine.toLowerCase().includes(normalizedQuery)) ||
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
  const g = getGlobalState();
  if (!g.isInitialized || !g.placesCache) {
    throw new Error('Place data service not initialized');
  }

  return g.placesCache.filter(
    (place) => place.category_items.includes(category) || place.category_cuisines.includes(category)
  );
}

/**
 * Filter places by price range
 * @param priceRange Price range to filter by
 * @returns Array of places in the specified price range
 */
export function filterPlacesByPriceRange(priceRange: string): Place[] {
  const g = getGlobalState();
  if (!g.isInitialized || !g.placesCache) {
    throw new Error('Place data service not initialized');
  }

  return g.placesCache.filter((place) => place.price_range === priceRange);
}

/**
 * Get places with rating above a threshold
 * @param minRating Minimum rating threshold
 * @returns Array of places with rating above the threshold
 */
export function getPlacesByMinimumRating(minRating: number): Place[] {
  const g = getGlobalState();
  if (!g.isInitialized || !g.placesCache) {
    throw new Error('Place data service not initialized');
  }

  return g.placesCache.filter((place) => {
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
