# Place Search Feature

## Overview

The Place Search feature allows users to search for places based on natural language queries. It includes components for displaying place cards, lists of places, and detailed information about individual places.

## Components

### PlaceCard

A component that displays basic information about a single place in a card format.

#### Props

- `place`: The place object to display
- `onClick`: Optional callback function when the card is clicked

#### Usage

```tsx
import { PlaceCard } from '@/components/places';

<PlaceCard 
  place={placeObject} 
  onClick={(place) => console.log('Clicked place:', place)} 
/>
```

### PlaceList

A component that displays a list of PlaceCard components in a responsive grid layout.

#### Props

- `places`: Array of place objects to display
- `onPlaceClick`: Optional callback function when a place card is clicked

#### Usage

```tsx
import { PlaceList } from '@/components/places';

<PlaceList 
  places={placesArray} 
  onPlaceClick={(place) => console.log('Clicked place:', place)} 
/>
```

### PlaceDetail

A modal component that displays detailed information about a single place.

#### Props

- `open`: Boolean indicating whether the modal is open
- `place`: The place object to display details for
- `onClose`: Callback function to close the modal
- `onAddToItinerary`: Optional callback function when "Add to Itinerary" button is clicked

#### Usage

```tsx
import { PlaceDetail } from '@/components/places';

<PlaceDetail
  open={isModalOpen}
  place={selectedPlace}
  onClose={() => setIsModalOpen(false)}
  onAddToItinerary={(place) => console.log('Add to itinerary:', place)}
/>
```

### PlaceSearchResults

A high-level component that combines PlaceList and PlaceDetail to provide a complete search results experience.

#### Props

- `places`: Array of place objects to display
- `loading`: Optional boolean indicating whether data is loading
- `onPlaceSelect`: Optional callback function when a place is selected
- `onAddToItinerary`: Optional callback function when "Add to Itinerary" button is clicked

#### Usage

```tsx
import { PlaceSearchResults } from '@/features/place-search';

<PlaceSearchResults
  places={searchResults}
  loading={isLoading}
  onPlaceSelect={(place) => console.log('Selected place:', place)}
  onAddToItinerary={(place) => console.log('Add to itinerary:', place)}
/>
```

## Services

### PlaceService

Provides functions for interacting with place data.

#### Functions

- `searchPlaces(query: string)`: Searches for places based on a query string
- `getPlaceById(id: string)`: Retrieves a specific place by its ID

### NLPProcessor

Processes natural language queries to extract search criteria.

#### Functions

- `parseUserPrompt(prompt: string)`: Parses a user prompt to extract search criteria

## Data Models

### Place

Represents a place/location that can be recommended to users.

#### Properties

- `id`: Unique identifier for the place
- `name`: Name of the place
- `category_items`: Array of category items
- `category_cuisines`: Array of cuisine types
- `address`: Address information (street, district, city)
- `price_range`: Price range information
- `rating`: Average rating of the place
- `open_times`: Operating hours
- `url`: URL to the place's page
- `photos`: Array of photo URLs (optional)
- `reviews`: Array of reviews (optional)

## Testing

All components and services have comprehensive test coverage using React Testing Library and Vitest.

To run the tests:

```bash
npm run test-app -- src/components/places src/features/place-search
```