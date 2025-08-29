# Lobe Chat

Lobe Chat is an open-source, modern design ChatGPT/LLMs UI/framework. It supports speech synthesis, multi-modal, and extensible (function call) plugin system. One-click **FREE** deployment of your private OpenAI ChatGPT/Claude/Gemini/Groq/Ollama chat application.

## Building and Running

### Development

To start the development server, run:

```bash
pnpm dev
```

### Production

To build the application for production, run:

```bash
pnpm build
```

To start the production server, run:

```bash
pnpm start
```

### Testing

To run the tests, run:

```bash
pnpm test
```

### Docker

To build a Docker image for self-hosting, run:

```bash
pnpm self-hosting:docker
```

## Development Conventions

The project uses ESLint for linting and Prettier for code formatting. The linting rules are defined in the `.eslintrc.js` file and the Prettier configuration is in the `.prettierrc.js` file. The project also uses Husky to run pre-commit hooks.
