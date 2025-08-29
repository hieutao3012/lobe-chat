# Development Workflow

To ensure a smooth development process for Box Chat AI, we'll define the setup and workflow that extends LobeChat's existing processes.

## Local Development Setup

### Prerequisites

Before starting development, ensure you have the following installed:

```bash
# Node.js (version 18 or higher)
node --version

# pnpm (package manager)
npm install -g pnpm

# Git
git --version
```

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/box-chat-ai.git
cd box-chat-ai

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the development server
pnpm dev
```

### Development Commands

```bash
# Start all services
pnpm dev

# Start frontend only
pnpm dev:web

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Configuration

### Required Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_APP_NAME=Box Chat AI
NEXT_PUBLIC_BASE_URL=http://localhost:3010

# Backend
PLACES_JSON_URL=/data/places.json

# Authentication (using LobeChat's existing setup)
NEXTAUTH_URL=http://localhost:3010
NEXTAUTH_SECRET=your-secret-key

# API Keys (for future external API integrations)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENWEATHER_API_KEY=your-openweather-api-key
```

This development workflow builds upon LobeChat's existing processes while adding specific configurations for Box Chat AI. The setup ensures developers can quickly get started and maintain consistency with the existing codebase.
