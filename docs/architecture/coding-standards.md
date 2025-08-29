# Coding Standards

To ensure consistency and maintainability of the codebase, we'll establish clear coding standards for the Box Chat AI project. These standards build upon LobeChat's existing conventions while adding specific rules for the new functionality.

## Critical Fullstack Rules

- **Type Sharing:** Always define types in `packages/shared/src/types` and import from there to ensure consistency between frontend and backend
- **API Calls:** Never make direct HTTP calls - use the service layer (`src/services/api/client.ts`) for all API interactions
- **Environment Variables:** Access only through config objects, never `process.env` directly in components or services
- **Error Handling:** All API routes must use the standard error handler middleware
- **State Updates:** Never mutate state directly - use proper state management patterns with Zustand
- **Component Structure:** Follow the existing LobeChat pattern of separating components into `components/`, `features/`, and `hooks/` directories
- **Data Processing:** For large data files like `places.json`, implement streaming or chunked processing to avoid memory issues
- **User Preferences:** Store user preferences in a consistent format using the defined UserPreferences interface

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `PlaceCard.tsx` |
| Hooks | camelCase with 'use' | - | `usePlaceSearch.ts` |
| API Routes | kebab-case | kebab-case | `/api/places/search` |
| Database Tables | snake_case | snake_case | `user_itineraries` |
| Variables | camelCase | camelCase | `placeData` |
| Functions | camelCase | camelCase | `searchPlaces()` |
| Interfaces | PascalCase with 'I' prefix | PascalCase | `IPlace`, `IItinerary` |
| Constants | UPPER_SNAKE_CASE | UPPER_SNAKE_CASE | `MAX_RESULTS` |
| Files | kebab-case | kebab-case | `place-service.ts` |

These coding standards ensure consistency across the codebase and help prevent common mistakes. They're designed to be minimal but critical, focusing on the most important rules that will help maintain code quality as the project grows.
