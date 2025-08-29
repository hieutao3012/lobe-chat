# Unified Project Structure

The project structure for Box Chat AI follows LobeChat's existing monorepo approach while adding new directories for the specific functionality. Here's how the project is organized:

```
box-chat-ai/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml
│       └── deploy.yaml
├── apps/                       # Application packages
│   ├── web/                    # Frontend application (LobeChat with Box Chat AI extensions)
│   │   ├── src/
│   │   │   ├── app/            # Next.js app directory structure
│   │   │   │   ├── (tabs)/     # LobeChat existing tab structure
│   │   │   │   ├── places/     # New routes for place features
│   │   │   │   ├── itineraries/ # New routes for itinerary features
│   │   │   │   ├── api/        # Next.js API routes
│   │   │   │   └── ...
│   │   │   ├── components/     # React components
│   │   │   │   ├── chat/       # LobeChat existing components
│   │   │   │   ├── places/     # New components for place recommendations
│   │   │   │   ├── itinerary/  # New components for itinerary planning
│   │   │   │   └── shared/     # Shared components between features
│   │   │   ├── features/       # Feature-based organization
│   │   │   │   ├── place-search/  # Place search feature
│   │   │   │   ├── itinerary-planner/ # Itinerary planning feature
│   │   │   │   └── chat-extension/ # Extensions to LobeChat
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── services/       # Business logic and API integrations
│   │   │   ├── stores/         # Zustand stores for global state
│   │   │   ├── styles/         # Global styles/themes
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   ├── utils/          # Utility functions
│   │   │   └── ...
│   │   ├── public/             # Static assets
│   │   │   ├── data/           # Static data files (places.json)
│   │   │   └── ...
│   │   ├── tests/              # Frontend tests
│   │   └── package.json
│   └── ...
├── packages/                   # Shared packages from LobeChat
│   ├── shared/                 # Shared types/utilities
│   │   ├── src/
│   │   │   ├── types/          # TypeScript interfaces shared between frontend and backend
│   │   │   ├── constants/      # Shared constants
│   │   │   └── utils/          # Shared utilities
│   │   └── package.json
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   └── package.json
│   └── config/                 # Shared configuration
│       ├── eslint/
│       ├── typescript/
│       └── jest/
├── data/                       # Data files
│   └── places.json             # Static place data
├── docs/                       # Documentation
│   ├── prd.md
│   ├── architecture.md         # This document
│   └── ...
├── scripts/                    # Build/deploy scripts
├── .env.example                # Environment template
├── package.json                # Root package.json
├── pnpm-lock.yaml              # Dependency lock file
├── pnpm-workspace.yaml         # Monorepo configuration
└── README.md
```

This structure maintains consistency with LobeChat's existing organization while providing clear separation for Box Chat AI specific functionality. The structure allows for easy navigation and maintenance of both the existing LobeChat features and the new place recommendation and itinerary planning features.
