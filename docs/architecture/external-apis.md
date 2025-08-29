# External APIs

For the MVP of Box Chat AI, there are no external APIs required as all data is contained within the `places.json` file and the application leverages the existing LobeChat infrastructure. However, for future phases, we may want to integrate with external services:

## Potential Future External APIs

### Map Service API (e.g., Google Maps API)
- **Purpose:** To provide visual mapping of recommended places and route optimization for itineraries
- **Documentation:** https://developers.google.com/maps/documentation
- **Base URL(s):** https://maps.googleapis.com/maps/api/
- **Authentication:** API key
- **Rate Limits:** Varies by plan, typically 1000-10000 requests per day for free tier

**Key Endpoints Used:**
- `GET /geocode/json` - To convert addresses to coordinates
- `GET /places/nearbysearch/json` - To find places near a location
- `GET /directions/json` - To calculate routes between places

**Integration Notes:** Would require implementing API key management and handling rate limiting. Could be used to enhance the place recommendation experience and provide optimized routes for itineraries.

### Weather API (e.g., OpenWeatherMap)
- **Purpose:** To provide weather information for recommended places and help with itinerary planning
- **Documentation:** https://openweathermap.org/api
- **Base URL(s):** https://api.openweathermap.org/data/2.5/
- **Authentication:** API key
- **Rate Limits:** 1000 calls/day for free tier

**Key Endpoints Used:**
- `GET /weather` - To get current weather for a location
- `GET /forecast` - To get weather forecast for a location

**Integration Notes:** Would help users plan their outings based on weather conditions. Would need to implement caching to stay within rate limits.

For the MVP, these external APIs are not required and will be considered for post-MVP enhancements as outlined in the PRD.
