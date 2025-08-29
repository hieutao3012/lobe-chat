# Introduction

This document outlines the complete fullstack architecture for Box Chat AI, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

Box Chat AI is built upon the existing LobeChat platform, which provides a solid foundation for building AI-powered chat applications. LobeChat is an open-source, modern design ChatGPT/LLMs UI/framework that supports speech synthesis, multi-modal, and extensible Function Call plugin system.

**Rationale:** Building on LobeChat provides several advantages:
- Existing chat interface that users are already familiar with
- Support for multiple AI providers (OpenAI, Anthropic, Google, Ollama, etc.)
- Plugin system for extensibility
- Responsive design that works on both desktop and mobile
- Existing deployment infrastructure on Vercel

**Constraints:**
- Must maintain compatibility with existing LobeChat features
- Architecture decisions must align with LobeChat's existing structure
- Need to carefully integrate new functionality without breaking existing features

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-08-28 | 1.0 | Initial architecture document | Winston (Architect) |
