# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | ^5.8.3 | Type-safe JavaScript development | Already used by LobeChat, provides type safety and better developer experience |
| Frontend Framework | Next.js | ~15.3.5 | React-based framework for production apps | Already used by LobeChat, provides SSR, SSG, and API routes |
| UI Component Library | Ant Design | ^5.26.6 | UI components for React | Already used by LobeChat, provides comprehensive component set |
| State Management | Zustand | 5.0.4 | Simple, scalable state management | Already used by LobeChat, lightweight and easy to use |
| Backend Language | TypeScript | ^5.8.3 | Type-safe JavaScript development | Consistent with frontend, no separate backend for MVP |
| Backend Framework | Next.js API Routes | ~15.3.5 | Serverless functions for backend logic | Already available in LobeChat, no separate backend for MVP |
| API Style | REST API | N/A | Communication between frontend and backend | Using Next.js API routes when needed |
| Database | Static JSON File | N/A | Storage for place data | As specified in PRD, using places.json file |
| Cache | Browser Storage | N/A | Client-side caching | Using localStorage/sessionStorage for user preferences |
| File Storage | Vercel CDN | N/A | Static file hosting | Hosting places.json as static asset |
| Authentication | NextAuth.js | 5.0.0-beta.29 | Authentication solution | Already integrated in LobeChat |
| Frontend Testing | Jest/Vitest | ^3.2.4 | Unit and integration testing | Already used by LobeChat |
| Backend Testing | Jest/Vitest | ^3.2.4 | Unit and integration testing | Already used by LobeChat |
| E2E Testing | Playwright/Cypress | N/A | End-to-end testing | Can be added if needed |
| Build Tool | pnpm | 10.10.0 | Package manager and build tool | Already used by LobeChat |
| Bundler | Webpack/Turbopack | N/A | Module bundling | Handled by Next.js |
| IaC Tool | N/A | N/A | Infrastructure as Code | Using Vercel's platform, no separate IaC needed for MVP |
| CI/CD | GitHub Actions | N/A | Continuous integration and deployment | Already set up in LobeChat |
| Monitoring | Vercel Analytics | ^1.5.0 | Performance and usage monitoring | Already integrated in LobeChat |
| Logging | pino | ^9.7.0 | Logging solution | Already used by LobeChat |
| CSS Framework | antd-style | ^3.7.1 | CSS-in-JS solution | Already used by LobeChat |
