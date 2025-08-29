# API Specification

Based on the PRD and the client-side only architecture for the MVP, we'll be using a simplified API approach that primarily involves client-side processing of the `places.json` file. However, for future phases and better organization, we'll define a REST API structure that could be implemented with Next.js API routes.

## REST API Specification

```yaml
openapi: 3.0.0
info:
  title: Box Chat AI API
  version: 1.0.0
  description: API for Box Chat AI place recommendation and itinerary planning
servers:
  - url: /api
    description: Local server for development
  - url: https://your-vercel-url.vercel.app/api
    description: Production server

paths:
  /places:
    get:
      summary: Search for places
      description: Search for places based on various criteria
      parameters:
        - name: query
          in: query
          description: Search query string
          required: false
          schema:
            type: string
        - name: category
          in: query
          description: Filter by category
          required: false
          schema:
            type: string
        - name: area
          in: query
          description: Filter by area/district
          required: false
          schema:
            type: string
        - name: priceRange
          in: query
          description: Filter by price range
          required: false
          schema:
            type: string
        - name: limit
          in: query
          description: Maximum number of results to return
          required: false
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  places:
                    type: array
                    items:
                      $ref: '#/components/schemas/Place'
        '400':
          description: Invalid request parameters
        '500':
          description: Internal server error

  /itineraries:
    post:
      summary: Create a new itinerary
      description: Create a new itinerary with selected places
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ItineraryInput'
      responses:
        '201':
          description: Itinerary created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Itinerary'
        '400':
          description: Invalid request body
        '500':
          description: Internal server error

  /itineraries/{id}:
    get:
      summary: Get an itinerary by ID
      description: Retrieve a specific itinerary by its ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Itinerary'
        '404':
          description: Itinerary not found
        '500':
          description: Internal server error

    put:
      summary: Update an itinerary
      description: Update an existing itinerary
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ItineraryInput'
      responses:
        '200':
          description: Itinerary updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Itinerary'
        '400':
          description: Invalid request body
        '404':
          description: Itinerary not found
        '500':
          description: Internal server error

    delete:
      summary: Delete an itinerary
      description: Delete an itinerary by its ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Itinerary deleted successfully
        '404':
          description: Itinerary not found
        '500':
          description: Internal server error

components:
  schemas:
    Address:
      type: object
      properties:
        street:
          type: string
        district:
          type: string
        city:
          type: string
      required:
        - street
        - district
        - city

    Place:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        categoryItems:
          type: array
          items:
            type: string
        categoryCuisines:
          type: array
          items:
            type: string
        address:
          $ref: '#/components/schemas/Address'
        priceRange:
          type: string
          nullable: true
        rating:
          type: string
        openTimes:
          type: array
          items:
            type: string
      required:
        - id
        - name
        - categoryItems
        - address
        - rating
        - openTimes

    ItineraryInput:
      type: object
      properties:
        name:
          type: string
        places:
          type: array
          items:
            type: string  # Place IDs
        estimatedTimes:
          type: object
          additionalProperties:
            type: string
      required:
        - name
        - places

    Itinerary:
      allOf:
        - $ref: '#/components/schemas/ItineraryInput'
        - type: object
          properties:
            id:
              type: string
            createdAt:
              type: string
              format: date-time
            updatedAt:
              type: string
              format: date-time
          required:
            - id
            - createdAt
            - updatedAt
```

For the MVP, these API endpoints would be implemented as Next.js API routes that interact with the `places.json` file and browser storage. In future phases, when a dedicated backend is introduced, these specifications can be used to build a more robust API server.
