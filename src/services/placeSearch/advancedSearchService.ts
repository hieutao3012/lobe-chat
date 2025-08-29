// src/services/placeSearch/advancedSearchService.ts
import { Place } from '@/types/place';
import { SearchCriteria } from './nlpProcessor';
import {
  getAllPlaces,
  searchPlaces,
  filterPlacesByCategory,
  filterPlacesByPriceRange,
  getPlacesByMinimumRating,
  paginatePlaces
} from './placeService';

export interface AdvancedSearchResult {
  places: Place[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Perform an advanced search based on multiple criteria
 * @param criteria Search criteria
 * @param page Page number (1-indexed)
 * @param pageSize Number of items per page
 * @returns AdvancedSearchResult object with paginated results
 */
export function advancedSearch(
  criteria: SearchCriteria,
  page: number = 1,
  pageSize: number = 10
): AdvancedSearchResult {
  let results: Place[] = [];

  // Start with all places or search by name if query is provided
  if (criteria.query) {
    results = searchPlaces(criteria.query);
  } else {
    results = getAllPlaces();
  }

  // Filter by categories
  if (criteria.categories && criteria.categories.length > 0) {
    const categoryFiltered = criteria.categories.flatMap(category => 
      filterPlacesByCategory(category)
    );
    // Merge with existing results, avoiding duplicates
    results = [...new Set([...results, ...categoryFiltered])];
  }

  // Filter by price ranges
  if (criteria.priceRanges && criteria.priceRanges.length > 0) {
    const priceFiltered = criteria.priceRanges.flatMap(range => 
      filterPlacesByPriceRange(range)
    );
    // Merge with existing results, avoiding duplicates
    results = [...new Set([...results, ...priceFiltered])];
  }

  // Filter by minimum rating
  if (criteria.minRating !== undefined) {
    const ratingFiltered = getPlacesByMinimumRating(criteria.minRating);
    // Merge with existing results, avoiding duplicates
    results = [...new Set([...results, ...ratingFiltered])];
  }

  // Filter by areas (districts/cities)
  if (criteria.areas && criteria.areas.length > 0) {
    const areaFiltered = results.filter(place =>
      criteria.areas!.some(area =>
        place.address.district.toLowerCase().includes(area.toLowerCase()) ||
        place.address.city.toLowerCase().includes(area.toLowerCase())
      )
    );
    results = areaFiltered;
  }

  // Calculate pagination
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    places: paginatedResults,
    totalCount,
    page,
    pageSize,
    totalPages
  };
}

/**
 * Get popular places based on rating
 * @param limit Maximum number of places to return
 * @returns Array of popular places
 */
export function getPopularPlaces(limit: number = 10): Place[] {
  const allPlaces = getAllPlaces();
  
  // Sort by rating (descending) and then by name (ascending)
  const sortedPlaces = [...allPlaces].sort((a, b) => {
    const ratingA = parseFloat(a.rating) || 0;
    const ratingB = parseFloat(b.rating) || 0;
    
    if (ratingA !== ratingB) {
      return ratingB - ratingA; // Higher ratings first
    }
    
    return a.name.localeCompare(b.name); // Alphabetical order for same ratings
  });
  
  return sortedPlaces.slice(0, limit);
}

/**
 * Get places by multiple categories
 * @param categories Array of categories to filter by
 * @returns Array of places that belong to any of the specified categories
 */
export function getPlacesByCategories(categories: string[]): Place[] {
  if (!categories || categories.length === 0) {
    return [];
  }
  
  return getAllPlaces().filter(place =>
    categories.some(category =>
      place.category_items.includes(category) ||
      place.category_cuisines.includes(category)
    )
  );
}

/**
 * Get places within a price range
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @returns Array of places within the specified price range
 */
export function getPlacesByPriceRange(minPrice: number, maxPrice: number): Place[] {
  return getAllPlaces().filter(place => {
    if (!place.price_range) return false;
    
    // This is a simplified implementation
    // In a real-world scenario, you would need to parse the price range string
    // and compare with the actual prices
    return true; // Placeholder implementation
  });
}