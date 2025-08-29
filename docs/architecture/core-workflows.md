# Core Workflows

The following sequence diagrams illustrate key system workflows for Box Chat AI:

## Place Search Workflow

This workflow shows how a user's natural language query is processed to return place recommendations:

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat Interface
    participant P as Place Search
    participant D as Data Processing
    participant S as Browser Storage
    participant J as places.json

    U->>C: Sends natural language query
    C->>P: parseUserQuery(query)
    P->>P: Extract search criteria
    P->>D: searchPlaces(criteria)
    D->>J: Load places data (if not cached)
    J->>D: Return places data
    D->>D: Filter and sort places
    D->>S: Cache results
    D->>P: Return filtered places
    P->>C: Return place recommendations
    C->>U: Display place cards
```

## Itinerary Creation Workflow

This workflow shows how a user creates and manages an itinerary:

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat Interface
    participant I as Itinerary Planner
    participant S as Browser Storage

    U->>C: Selects places for itinerary
    C->>I: createItinerary(name, places)
    I->>I: Generate itinerary object
    I->>S: Save to browser storage
    S->>I: Confirm save
    I->>C: Return created itinerary
    C->>U: Display itinerary
```

## Itinerary Modification Workflow

This workflow shows how a user modifies an existing itinerary:

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat Interface
    participant I as Itinerary Planner
    participant S as Browser Storage

    U->>C: Requests to modify itinerary
    C->>I: getItinerary(id)
    I->>S: Retrieve from storage
    S->>I: Return itinerary
    I->>C: Return itinerary
    C->>U: Display for editing
    U->>C: Makes changes
    C->>I: updateItinerary(id, changes)
    I->>S: Update in storage
    S->>I: Confirm update
    I->>C: Return updated itinerary
    C->>U: Display updated itinerary
```

These workflows demonstrate the core interactions between components and show how data flows through the system. The design ensures that the user experience remains responsive and intuitive while maintaining data consistency.
