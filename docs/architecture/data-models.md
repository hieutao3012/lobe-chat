# Data Models

Based on the PRD and the structure of the `places.json` file, here are the core data models for Box Chat AI:

## Place Model

**Purpose:** Represents a location that can be recommended to users based on their preferences and search criteria.

**Key Attributes:**
- `id`: string - Unique identifier for the place
- `name`: string - Name of the place including category and target audience information
- `categoryItems`: string[] - Categories the place belongs to (e.g., "Ăn vặt/vỉa hè")
- `categoryCuisines`: string[] - Types of cuisine offered
- `address`: object - Contains street, district, and city information
- `priceRange`: string/null - Price range information
- `rating`: string - Average rating of the place
- `openTimes`: string[] - Operating hours
- `reviews`: array - Collection of user reviews
- `photos`: array - Images of the place

## Itinerary Model

**Purpose:** Represents a collection of places that a user has selected for their travel plan, along with timing information.

**Key Attributes:**
- `id`: string - Unique identifier for the itinerary
- `name`: string - Name/title given to the itinerary by the user
- `places`: Place[] - Array of places included in the itinerary
- `createdAt`: Date - When the itinerary was created
- `updatedAt`: Date - When the itinerary was last modified
- `estimatedTimes`: object - Estimated timing for visiting each place

## User Preference Model

**Purpose:** Stores user preferences to improve place recommendations over time.

**Key Attributes:**
- `id`: string - Unique identifier for the user preference set
- `favoriteCategories`: string[] - Categories the user has shown preference for
- `preferredPriceRange`: string - Price range the user typically prefers
- `favoriteAreas`: string[] - Geographic areas the user prefers
- `lastSearches`: string[] - Recent search queries to improve suggestions

## TypeScript Interfaces

```typescript
interface Address {
  street: string;
  district: string;
  city: string;
}

interface Place {
  id: string;
  name: string;
  categoryItems: string[];
  categoryCuisines: string[];
  address: Address;
  priceRange: string | null;
  rating: string;
  openTimes: string[];
  reviews?: any[]; // Simplified for now
  photos?: any[]; // Simplified for now
}

interface Itinerary {
  id: string;
  name: string;
  places: Place[];
  createdAt: Date;
  updatedAt: Date;
  estimatedTimes: Record<string, string>; // Place ID to estimated time
}

interface UserPreferences {
  id: string;
  favoriteCategories: string[];
  preferredPriceRange: string;
  favoriteAreas: string[];
  lastSearches: string[];
}
```

## Relationships

- An Itinerary contains multiple Places (1-to-many)
- User Preferences influence which Places are recommended (1-to-many)
- Places can belong to multiple Categories (many-to-many)
- Reviews and Photos are associated with Places (1-to-many)
