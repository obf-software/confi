# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Confi is a pnpm monorepo (v1.9.4) for intelligent opportunity matching and planning. The system helps organizations find relevant opportunities (grants, programs, funding) by using AI to match their profile with available opportunities through an intelligent tagging system.

### Technology Stack

- **Backend**: NestJS with TypeScript following hexagonal architecture
- **Frontend**: React 19 + Vite + Chakra UI v3 + React Router
- **Database**: MongoDB v8.0 (Docker port 52701)
- **File Storage**: AWS S3
- **AI**: OpenAI API for intelligent transformations
- **PDF Generation**: Puppeteer with Chromium

## Development Commands

### Prerequisites

```bash
# Start local services (MongoDB + MinIO)
docker-compose up -d
```

### Root Level

```bash
pnpm lint     # Lint all packages
pnpm format   # Format with Prettier
```

### API Package (packages/api)

```bash
pnpm dev         # Start dev server with hot reload
pnpm build       # Build for production
pnpm start       # Start production server
pnpm test        # Run unit tests
pnpm test:watch  # Run tests in watch mode
pnpm test:cov    # Generate coverage report
pnpm test:e2e    # Run e2e tests
```

### Client Package (packages/client)

```bash
pnpm dev              # Start Vite dev server
pnpm build            # TypeScript check + production build
pnpm preview          # Preview production build
pnpm chakra:typegen   # Generate Chakra UI types
```

## Architecture

### API - Hexagonal Architecture

The API strictly follows hexagonal architecture with three layers:

1. **Domain Layer** (`/domain`)
   - Pure business entities: Opportunity, Planning, Tag, PlanningData
   - No external dependencies

2. **Application Layer** (`/application`)
   - Use cases orchestrating business logic:
     - `create-planning`: Generates PDF and ICS files from opportunities
     - `create-tag`: Creates categorization tags
     - `find-opportunities`: Searches based on form criteria
     - `load-opportunities`: Imports from external sources

3. **Infrastructure Layer** (`/infrastructure`)
   - Controllers: REST endpoints under `/api/v0/`
   - Services: Repository implementations, external integrations
   - Factories: DI factories for MongoDB and OpenAI clients

### Frontend Architecture

- **Routing**: React Router with role-based protected routes (ADMIN/USER)
- **State**: React Query for server state management
- **UI**: Chakra UI v3 with custom theme and dark mode support
- **Forms**: Multi-step search form (Name → Briefing → Diversity)
- **Authentication**: AWS Amplify with Cognito integration
- **Dashboard**: Role-based navigation with admin and user sections

### Key Integrations

1. **Google Sheets**: Primary data source for opportunities
2. **OpenAI**: Powers intelligent data transformation and tagging
3. **File Storage**: Abstracted service supporting MinIO (dev) and S3 (prod)
4. **PDF/ICS Generation**: Server-side with Puppeteer for planning exports

## Environment Configuration

Configure using `.env` files (see `.env.example` in each package):

### API Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `GOOGLE_*`: Google Sheets credentials and spreadsheet ID
- `OPENAI_*`: API key and organization
- `MINIO_*` or `AWS_*`: File storage credentials
- `CHROME_*`: Puppeteer configuration

### Client Environment Variables

- `VITE_API_URL`: Backend API URL

## API Documentation

Swagger/OpenAPI documentation available at `/api-spec` when API is running.

## Code Style

Prettier configuration:

- 2 spaces, single quotes, 100-char lines
- Trailing commas (ES5), single JSX attribute per line
- Run `pnpm format` before committing

## Testing

Jest is configured for the API package. Run specific test files:

```bash
cd packages/api
pnpm test path/to/file.spec.ts
```

Note: Test files are not yet implemented in the codebase.

## System Flow

### Core Concept
Confi uses an AI-powered tagging system to match organizations with relevant opportunities. The system works in two main phases:

1. **Admin Phase**: Opportunities are discovered, reviewed, and tagged
2. **User Phase**: Organizations search and receive matched opportunities

### Detailed Flow

#### 1. Opportunity Discovery (Admin)
- Admins create **Opportunity Searches** with specific prompts
- System performs deep research to find relevant opportunities
- Found opportunities are created with `PENDING_REVIEW` status
- Admins review and approve opportunities → status changes to `ACTIVE`

#### 2. Tag Management (Admin)
- Admins create **Tags** to categorize opportunities
- Tags represent characteristics like: Technology, Education, Sustainability, etc.
- Tags are the bridge between opportunities and user searches

#### 3. Evaluation Process (Admin)
- Admins run **Evaluations** to automatically assign tags to opportunities
- LLM analyzes each opportunity and determines applicable tags
- Process runs in background, processing all untagged opportunities
- Once complete, opportunities have tags for matching

#### 4. User Search Flow
- Users provide information about their organization:
  - Organization name and description
  - Activity region and type
  - Business stage and focus areas
  - Diversity information
- System uses LLM to determine relevant tags based on user input
- Backend queries opportunities matching those tags
- Returns personalized list of opportunities

#### 5. Planning Generation
- Users select relevant opportunities from search results
- System creates a **Planning** with selected opportunities
- Generates PDF with detailed application instructions
- Creates ICS calendar file with important deadlines

### User Roles

#### ADMIN Role
- Access to system configuration and management
- Responsibilities:
  - Create and manage opportunity searches
  - Review and approve opportunities
  - Create and manage tags
  - Run evaluation processes
  - Monitor system statistics
  - View all user plannings

#### USER Role
- Access to opportunity search and planning
- Capabilities:
  - Search for opportunities
  - Create plannings
  - Download PDF/ICS files
  - Manage profile

### Dashboard Pages

#### Admin Pages
- **Estatísticas**: System overview and metrics
- **Tags**: Create and manage categorization tags
- **Avaliações**: Run and monitor tag assignment process
- **Oportunidades**: Manage all opportunities in the system
- **Busca de Oportunidades**: Configure automated opportunity searches
- **Planejamentos**: View all user-created plannings

#### Common Pages
- **Buscar Oportunidades**: Multi-step form for finding opportunities
- **Meus Planejamentos**: User's personal plannings
- **Perfil**: User profile management

## Deployment

- **GitHub Actions**: Automated releases with release-please
- **Frontend**: Deploys to GitHub Pages on release
- **API**: Docker multi-stage build with Chromium dependencies
