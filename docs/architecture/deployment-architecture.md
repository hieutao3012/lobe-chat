# Deployment Architecture

The deployment architecture for Box Chat AI leverages Vercel's platform, which is already used by LobeChat, ensuring consistency and minimizing infrastructure changes.

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **CDN/Edge:** Vercel's global CDN for optimal performance

**Backend Deployment:**
- **Platform:** Vercel Serverless Functions
- **Build Command:** Automatically handled by Next.js
- **Deployment Method:** Serverless functions for API routes

## CI/CD Pipeline

```yaml
# .github/workflows/ci.yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

```yaml
# .github/workflows/deploy.yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3010 | http://localhost:3010/api | Local development |
| Staging | https://staging.boxchatai.com | https://staging.boxchatai.com/api | Pre-production testing |
| Production | https://boxchatai.com | https://boxchatai.com/api | Live environment |

This deployment architecture leverages Vercel's seamless Next.js integration, providing automatic serverless function deployment for API routes and optimal CDN distribution for the frontend. The CI/CD pipeline ensures code quality through automated testing and linting before deployment.
