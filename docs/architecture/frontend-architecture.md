# Frontend Architecture

The frontend architecture for Box Chat AI builds upon LobeChat's existing structure while adding new components for place recommendations and itinerary planning.

## Component Architecture

### Component Organization

```
src/
├── components/
│   ├── chat/                 # LobeChat existing components
│   ├── places/               # New components for place recommendations
│   │   ├── PlaceCard.tsx     # Component to display individual place
│   │   ├── PlaceList.tsx     # Component to display list of places
│   │   └── PlaceSearch.tsx   # Component to handle place search functionality
│   ├── itinerary/            # New components for itinerary planning
│   │   ├── ItineraryBuilder.tsx  # Component to build and manage itineraries
│   │   ├── ItineraryItem.tsx     # Component to display individual itinerary item
│   │   └── ItineraryList.tsx     # Component to display list of itineraries
│   └── shared/               # Shared components between features
├── features/                 # Feature-based organization
│   ├── place-search/         # Place search feature
│   │   ├── hooks/            # Custom hooks for place search
│   │   ├── services/         # Services for place search
│   │   └── stores/           # Zustand stores for place search
│   ├── itinerary-planner/    # Itinerary planning feature
│   │   ├── hooks/            # Custom hooks for itinerary planning
│   │   ├── services/         # Services for itinerary planning
│   │   └── stores/           # Zustand stores for itinerary planning
│   └── chat-extension/       # Extensions to LobeChat
├── hooks/                    # Shared custom hooks
├── services/                 # Shared services
├── stores/                   # Shared Zustand stores
└── utils/                    # Utility functions
```

### Component Template

```typescript
// Example component template
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useSessionStore } from '@/store/session';

interface PlaceCardProps {
  place: Place;
  onSelect?: (place: Place) => void;
}

const PlaceCard = memo<PlaceCardProps>(({ place, onSelect }) => {
  const { t } = useTranslation('places');
  const [toggleSelect] = useSessionStore((s) => [s.toggleSelect]);

  return (
    <Flexbox
      onClick={() => {
        toggleSelect(place.id);
        onSelect?.(place);
      }}
      style={{ cursor: 'pointer' }}
    >
      <h3>{place.name}</h3>
      <p>{place.address.street}, {place.address.district}, {place.address.city}</p>
      <p>Rating: {place.rating}</p>
    </Flexbox>
  );
});

export default PlaceCard;
```

## State Management Architecture

### State Structure

```typescript
// Zustand store for place search
interface PlaceSearchState {
  searchQuery: string;
  searchResults: Place[];
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
  setSearchQuery: (query: string) => void;
  searchPlaces: (criteria: SearchCriteria) => Promise<void>;
  setFilters: (filters: SearchFilters) => void;
}

// Zustand store for itinerary planning
interface ItineraryState {
  itineraries: Record<string, Itinerary>;
  currentItinerary: string | null;
  addPlaceToItinerary: (itineraryId: string, place: Place) => void;
  removePlaceFromItinerary: (itineraryId: string, placeId: string) => void;
  createItinerary: (name: string) => string; // Returns new itinerary ID
  deleteItinerary: (id: string) => void;
}
```

### State Management Patterns

1. **Feature-based stores**: Each major feature (place search, itinerary planning) has its own Zustand store
2. **Async data fetching**: Using Zustand's async actions for data fetching with loading states
3. **Immutability**: Treating state as immutable and using proper update patterns
4. **Selective subscription**: Components subscribe only to the specific state slices they need

## Routing Architecture

### Route Organization

```
src/app/
├── (tabs)/                  # LobeChat existing tab structure
│   ├── chat/
│   ├── market/
│   ├── settings/
│   └── welcome/
├── places/                  # New routes for place features
│   ├── search/
│   │   └── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── layout.tsx
├── itineraries/             # New routes for itinerary features
│   ├── [id]/
│   │   └── page.tsx
│   ├── create/
│   │   └── page.tsx
│   └── page.tsx
├── layout.tsx
└── page.tsx
```

### Protected Route Pattern

```typescript
// Example of protected route implementation
'use client';

import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

## Frontend Services Layer

### API Client Setup

```typescript
// api/client.ts
import { Place, Itinerary } from '@/types';

const API_BASE_URL = '/api';

export const apiClient = {
  // Place search endpoints
  searchPlaces: async (criteria: SearchCriteria): Promise<Place[]> => {
    const params = new URLSearchParams(criteria as any);
    const response = await fetch(`${API_BASE_URL}/places?${params}`);
    if (!response.ok) {
      throw new Error('Failed to search places');
    }
    return response.json();
  },

  // Itinerary endpoints
  createItinerary: async (itinerary: Omit<Itinerary, 'id' | 'createdAt' | 'updatedAt'>): Promise<Itinerary> => {
    const response = await fetch(`${API_BASE_URL}/itineraries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itinerary),
    });
    if (!response.ok) {
      throw new Error('Failed to create itinerary');
    }
    return response.json();
  },

  getItinerary: async (id: string): Promise<Itinerary> => {
    const response = await fetch(`${API_BASE_URL}/itineraries/${id}`);
    if (!response.ok) {
      throw new Error('Failed to get itinerary');
    }
    return response.json();
  },

  updateItinerary: async (id: string, updates: Partial<Itinerary>): Promise<Itinerary> => {
    const response = await fetch(`${API_BASE_URL}/itineraries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update itinerary');
    }
    return response.json();
  },

  deleteItinerary: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/itineraries/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete itinerary');
    }
  }
};
```

### Service Example

```typescript
// services/placeService.ts
import { Place, SearchCriteria } from '@/types';
import { apiClient } from '@/api/client';

export class PlaceService {
  static async search(criteria: SearchCriteria): Promise<Place[]> {
    try {
      // First check localStorage cache
      const cacheKey = `places_search_${JSON.stringify(criteria)}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }

      // If not cached, fetch from API
      const places = await apiClient.searchPlaces(criteria);
      
      // Cache results
      localStorage.setItem(cacheKey, JSON.stringify(places));
      
      return places;
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Place | null> {
    // For MVP, we'll search through the places data
    // In future phases, this could be optimized with an index
    const allPlaces = await this.getAll();
    return allPlaces.find(place => place.id === id) || null;
  }

  static async getAll(): Promise<Place[]> {
    try {
      const cached = localStorage.getItem('all_places');
      if (cached) {
        return JSON.parse(cached);
      }

      // Load from places.json
      const response = await fetch('/data/places.json');
      const places = await response.json();
      
      // Cache results
      localStorage.setItem('all_places', JSON.stringify(places));
      
      return places;
    } catch (error) {
      console.error('Error loading places:', error);
      throw error;
    }
  }
}
```

This frontend architecture extends LobeChat's existing structure while adding new components and services for the place recommendation and itinerary planning features. The design maintains consistency with LobeChat's patterns while providing a solid foundation for the new functionality.
