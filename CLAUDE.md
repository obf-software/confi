# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a pnpm monorepo with two main packages:
- `packages/api` - NestJS backend API with hexagonal architecture
- `packages/client` - React frontend using Chakra UI and Vite

## Development Commands

### Root level commands
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier

### API (packages/api)
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:e2e` - Run end-to-end tests

### Client (packages/client)
- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build for production (runs TypeScript check first)
- `pnpm preview` - Preview production build
- `pnpm chakra:typegen` - Generate Chakra UI types

## Architecture

The API follows hexagonal architecture with clear separation:
- `application/` - Use cases and business logic
- `domain/` - Core entities (Opportunity, Tag)
- `infrastructure/` - External concerns (controllers, database, services)

Key integrations:
- MongoDB for data persistence
- Google Sheets as opportunity data source
- OpenAI for data transformation and tagging
- Swagger/OpenAPI documentation at `/api-spec`

The client uses React Router for navigation and Chakra UI for components, with opportunity search and planning features.

## Database

MongoDB runs via Docker Compose on port 52701. Use `docker-compose up` to start the database.

## Environment Setup

Both packages require environment configuration. Check `packages/api/env.example` for required API environment variables.