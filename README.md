# Box Chat AI - LobeChat Extension

Box Chat AI is an extension for LobeChat that adds place recommendation and itinerary planning capabilities to the chat interface.

## Features

### Place Search
Users can search for places (restaurants, cafes, attractions, etc.) using natural language queries. The system understands Vietnamese queries and can extract relevant information such as:

- Place types (restaurants, cafes, etc.)
- Cuisine types (Vietnamese, Japanese, etc.)
- Location preferences (districts, neighborhoods)
- Price ranges
- Ratings

The search results are displayed as visually appealing place cards that include:

- Place name and rating
- Price range
- Category tags
- Address information
- Photos

Users can click on place cards to view detailed information about a specific place.

### Itinerary Planning
Users can create travel itineraries by selecting places from search results. The system helps organize these places into a cohesive travel plan with estimated timing.

## Technical Architecture

### Frontend Components

- **Place Cards**: Visually appealing cards that display essential information about places
- **Place Lists**: Responsive grids that organize place cards
- **Place Details**: Modal windows that show comprehensive information about individual places
- **Search Interface**: Natural language input for querying places

### Backend Services

- **NLP Processor**: Processes Vietnamese text to extract search criteria from user queries
- **Place Data Service**: Loads and caches the large places.json file for fast querying
- **Advanced Search Service**: Implements complex search algorithms to find relevant places
- **User Prompt Processor**: Interprets user queries and handles ambiguous requests

### Data Models

The system uses a comprehensive data model based on the places.json file with over 170,000 places in Vietnam. Each place includes:

- Basic information (name, address, rating)
- Category and cuisine information
- Pricing information
- Operating hours
- Photos and reviews
- Links to Foody.vn for more details

## Demo

To see the place search feature in action, visit the [demo page](/src/app/place-search-demo/page.tsx).

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

### Testing

Run all tests:
```bash
npm run test-app
```

Run tests for place search components specifically:
```bash
npm run test-app -- src/components/places src/features/place-search
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT