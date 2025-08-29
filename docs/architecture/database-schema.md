# Database Schema

For the MVP of Box Chat AI, we're using a static JSON file (`places.json`) for place data and browser storage (localStorage) for user itineraries and preferences. Here's how the data is structured:

## Places Data Schema

The `places.json` file contains an array of place objects with the following structure:

```json
[
  {
    "id": "unique-identifier",
    "name": "Place Name with category and audience info",
    "category_items": ["Ăn vặt/vỉa hè", "Quán ăn"],
    "category_cuisines": ["Món Việt", "Quốc tế", "Đặc biệt"],
    "address": {
      "street": "28 Phan Phú Tiên, P. 10",
      "district": "Quận 5",
      "city": "TP. HCM"
    },
    "price_range": null,
    "rating": "7.1",
    "open_times": ["09:00 - 22:00", "09:00 - 22:00"],
    "reviews": [
      {
        "title": "Review title",
        "content": "Review content",
        "score": "8.0",
        "photos": ["photo-url-1", "photo-url-2"],
        "username": "reviewer-name",
        "time": "2023-05-15T10:30:00Z",
        "device": "via iPhone",
        "options": ["option1", "option2"],
        "hashtags": ["#hashtag1", "#hashtag2"]
      }
    ],
    "photos": ["photo-url-1", "photo-url-2"],
    "professional_photos": ["pro-photo-url-1", "pro-photo-url-2"],
    "community_photos": ["community-photo-url-1", "community-photo-url-2"],
    "videos": ["video-url-1", "video-url-2"],
    "menu": ["menu-item-1", "menu-item-2"],
    "menu_album_images": ["menu-image-1", "menu-image-2"],
    "url": "place-website-url"
  }
]
```

## Browser Storage Schema

For user itineraries and preferences, we'll use the browser's localStorage with the following structure:

### Itineraries
```json
{
  "itineraries": {
    "itinerary-id-1": {
      "id": "itinerary-id-1",
      "name": "Weekend Trip",
      "places": ["place-id-1", "place-id-2"],
      "createdAt": "2023-05-15T10:30:00Z",
      "updatedAt": "2023-05-15T10:30:00Z",
      "estimatedTimes": {
        "place-id-1": "10:00",
        "place-id-2": "14:00"
      }
    }
  }
}
```

### User Preferences
```json
{
  "userPreferences": {
    "userId": {
      "favoriteCategories": ["Ăn vặt/vỉa hè", "Quán ăn"],
      "preferredPriceRange": "$",
      "favoriteAreas": ["Quận 5", "Quận 3"],
      "lastSearches": ["coffee shops", "pho restaurants"]
    }
  }
}
```

This schema design allows for efficient querying of the places data while maintaining flexibility for future enhancements. The use of localStorage for user data ensures that each user's itineraries and preferences are persisted locally in their browser.
