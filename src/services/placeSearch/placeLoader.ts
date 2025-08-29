// src/services/placeSearch/placeLoader.ts
import { Place } from '@/types/place';

/**
 * Load places data from the JSON file
 * @returns Promise that resolves to an array of Place objects
 */
export async function loadPlacesData(): Promise<Place[]> {
  try {
    // In a browser environment, we'll load the places data from a public URL
    // In a server environment, we might load directly from the file system
    if (typeof window !== 'undefined') {
      // Browser environment - load from public URL
      const response = await fetch('/data/places.json');
      const rawData: any[] = await response.json();
      
      // Transform the raw data to match our Place interface
      return rawData.map((place, index) => ({
        id: place.id || `${index}`, // Use existing ID or generate one
        name: place.name,
        category_items: place.category_items || [],
        category_cuisines: place.category_cuisines || [],
        address: {
          street: place.address?.street || '',
          district: place.address?.district || '',
          city: place.address?.city || ''
        },
        price_range: place.price_range || null,
        rating: place.rating || '0',
        open_times: place.open_times || [],
        reviews: place.reviews,
        photos: place.photos,
        professional_photos: place.professional_photos,
        community_photos: place.community_photos,
        videos: place.videos,
        menu: place.menu,
        menu_album_images: place.menu_album_images,
        url: place.url || ''
      }));
    } else {
      // Server environment - for now we'll throw an error as we don't have access to fs
      // In a real implementation, we would use fs.readFileSync here
      throw new Error('Server-side loading not implemented yet');
    }
  } catch (error) {
    console.error('Failed to load places data:', error);
    throw new Error('Failed to load places data');
  }
}