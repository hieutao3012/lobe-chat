# LobeChat Project Overview

## Project Type
This is a code project. It's a Next.js-based web application for an AI chat interface called LobeChat.

## Key Technologies
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Library**: Custom UI components (`@lobehub/ui`)
- **State Management**: Zustand
- **Styling**: `antd-style` (Ant Design based)
- **Testing**: Vitest, Testing Library
- **Deployment**: Vercel, Docker
- **AI SDKs**: OpenAI, Anthropic, Google, Ollama, and many others
- **Database**: Drizzle ORM (PostgreSQL, PGLite)
- **Authentication**: NextAuth.js, Clerk
- **Analytics**: PostHog, Plausible, Umami, Clarity, Google Analytics, Vercel Analytics

## Project Structure
- `src/`: Main source code
  - `app/`: Next.js app directory structure (pages, layouts, routes)
  - `components/`: Shared React components
  - `features/`: Feature-specific modules
  - `store/`: Zustand stores for global state
  - `services/`: Business logic and API integrations
  - `server/`: Server-side logic (SSR, API routes)
  - `hooks/`: Custom React hooks
  - `libs/`: Internal libraries and utilities
  - `locales/`: Internationalization files
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
- `public/`: Static assets
- `packages/`: Internal monorepo packages (likely for shared libraries)
- `tests/`: Test files
- `docs/`: Documentation
- `scripts/`: Utility scripts for building, development, etc.

## Building and Running

### Development
To start the development server:
```bash
pnpm dev
```
This will start the Next.js development server, typically on port 3010.

### Production Build
To build the application for production:
```bash
pnpm build
```

### Running Production Build
To run the built application:
```bash
pnpm start
```

### Testing
To run the test suite:
```bash
pnpm test
```

### Linting and Formatting
To lint the codebase:
```bash
pnpm lint
```

To format the codebase:
```bash
pnpm prettier
```

### Self-hosting
The application supports self-hosting via Docker. You can build a Docker image using:
```bash
pnpm self-hosting:docker
```
Or for a database-enabled version:
```bash
pnpm self-hosting:docker-cn@database
```

## Development Conventions
- Uses pnpm for package management.
- TypeScript is used throughout the project.
- Follows Next.js App Router conventions for file-based routing.
- Uses Zustand for state management.
- Employs a feature-based folder structure within `src/features`.
- Uses Ant Design-based styling with `antd-style`.
- Includes comprehensive testing with Vitest and Testing Library.
- Uses ESLint and Prettier for code quality and formatting.
- Uses Commitlint and Husky for commit message conventions and git hooks.
- Uses Semantic Release for versioning and changelog generation.

## Key Features
- Multi-model support (OpenAI, Anthropic, Google, Ollama, etc.)
- Plugin system (Function Calling)
- Agent marketplace
- Text-to-image generation
- Speech synthesis and recognition (TTS & STT)
- File upload and knowledge base
- Multi-user management
- Progressive Web App (PWA) support
- Desktop application support
- Internationalization (i18n)
- Custom themes
- Database support (PostgreSQL, PGLite)
- Analytics integration