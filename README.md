# Curotec Assessment - Full-Stack Posts Management System

> **Senior Software Engineer Assessment** - A demonstration of modern software engineering practices, AI-assisted development, and production-ready code quality.

## �� Project Overview

This project demonstrates my approach to **product engineering** - building robust, scalable applications using cutting-edge tools while maintaining high code quality and security standards. As a senior engineer, I believe in leveraging AI tools to accelerate development without compromising on architecture, testing, or maintainability.

### 🚀 Live Demo
- **Frontend Application**: [https://curotec-frontend-production.up.railway.app](https://curotec-frontend-production.up.railway.app)
- **Backend API**: [https://curotec-backend-production.up.railway.app](https://curotec-backend-production.up.railway.app)
- **API Documentation**: [https://curotec-backend-production.up.railway.app/api-docs](https://curotec-backend-production.up.railway.app/api-docs)

## 🏗️ Architecture & Engineering Decisions

### Backend Architecture
- **Clean Architecture** with clear separation of concerns
- **TypeScript** for type safety and better developer experience
- **Express.js** with middleware pattern for extensibility
- **Prisma ORM** for type-safe database operations
- **Zod** for runtime validation with compile-time type inference
- **PostgreSQL** for ACID compliance and advanced features
- **Swagger/OpenAPI** for comprehensive API documentation

### Frontend Architecture
- **React 18** with modern hooks and concurrent features
- **TypeScript** for type safety across the stack
- **React Query (TanStack Query)** for server state management
- **TailwindCSS** for utility-first styling
- **Vite** for fast development and optimized builds
- **Component-driven development** with reusable UI components

### DevOps & Deployment
- **Railway** for seamless deployment and scaling
- **Docker** for containerization and consistency
- **GitHub Actions** for CI/CD automation
- **Environment-based configuration** for different stages

## 🤖 AI-Assisted Development Approach

As a modern software engineer, I believe in leveraging AI tools to enhance productivity while maintaining code quality. This project demonstrates my approach:

### AI Tools Used
- **GitHub Copilot** for code suggestions and boilerplate generation
- **Claude/GPT** for architectural decisions and code review
- **AI-powered testing** for edge case identification

### Quality Assurance
- **Comprehensive test coverage** (unit, integration, e2e)
- **Code review practices** with AI assistance
- **Static analysis** and linting rules
- **Performance monitoring** and optimization
- **Security best practices** implementation

### Development Workflow
1. **AI-assisted planning** and architecture design
2. **Manual code review** of AI-generated suggestions
3. **Test-driven development** with AI-generated test cases
4. **Performance optimization** and security validation
5. **Documentation** and knowledge sharing

## ✨ Key Features

### Backend API
- **RESTful CRUD operations** with proper HTTP status codes
- **Advanced search and filtering** with pagination
- **Input validation** with detailed error messages
- **Rate limiting** and security headers
- **Comprehensive logging** and error handling
- **Database migrations** and seeding
- **Health checks** and monitoring endpoints

### Frontend Application
- **Responsive design** with mobile-first approach
- **Real-time search** with debouncing
- **Optimistic updates** for better UX
- **Error boundaries** and graceful error handling
- **Loading states** and skeleton screens
- **Accessibility** features (ARIA labels, keyboard navigation)
- **Performance optimization** (code splitting, lazy loading)

### Developer Experience
- **Hot reload** for both frontend and backend
- **TypeScript** for better IDE support
- **ESLint** and **Prettier** for code consistency
- **Comprehensive documentation** and examples
- **Easy setup** with Docker and npm scripts

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Validation**: Zod for runtime type safety
- **Testing**: Jest with Supertest
- **Documentation**: Swagger/OpenAPI 3.0

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4.x
- **Styling**: TailwindCSS 3.x
- **State Management**: React Query (TanStack Query)
- **Testing**: Vitest with Testing Library
- **UI Components**: Headless UI + Heroicons

### Infrastructure
- **Deployment**: Railway
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: Railway built-in monitoring

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ (or Docker)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/murilo-campaner/curotec-assessment.git
cd curotec-assessment
```

### 2. Start with Docker (Recommended)
```bash
# Start PostgreSQL
docker-compose up -d

# Or use Railway's managed PostgreSQL
```

### 3. Configure Environment
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your database URL

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL
```

### 4. Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Setup Database
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 6. Start Development Servers
```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)
cd frontend && npm run dev
```

### 7. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api-docs

## �� Testing Strategy

### Backend Testing
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Frontend Testing
```bash
cd frontend
npm run test          # Run all tests
npm run test:ui       # Visual test runner
npm run test:coverage # Coverage report
```

### Test Coverage Goals
- **Unit Tests**: >90% coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Main user journeys
- **Performance Tests**: Load testing for API endpoints

## 📚 API Documentation

The API follows RESTful principles with comprehensive documentation available at `/api-docs` when running.

### Core Endpoints
- `GET /api/posts` - List all posts with pagination
- `GET /api/posts/search` - Advanced search with filters
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update existing post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/stats` - Get post statistics
- `GET /api/health` - Health check endpoint

### Example Usage
```bash
# Create a post
curl -X POST https://curotec-backend-production.up.railway.app/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Software Engineering",
    "content": "Building scalable applications with AI assistance...",
    "published": true
  }'

# Search posts
curl "https://curotec-backend-production.up.railway.app/api/posts/search?query=engineering&published=true&page=1&limit=10"
```

## �� Design System

The project implements a consistent design system with:
- **Component Library**: Reusable UI components with TypeScript
- **Design Tokens**: Consistent spacing, colors, and typography
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized bundle sizes and loading

## 🚀 Deployment & DevOps

### Production Deployment
- **Railway**: Automated deployments from GitHub
- **Environment Management**: Separate configs for dev/staging/prod
- **Health Monitoring**: Built-in health checks and logging
- **SSL/TLS**: Automatic certificate management

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Code Quality**: Linting, type checking, and security scans
- **Performance**: Bundle analysis and optimization
- **Security**: Dependency vulnerability scanning

## 🔒 Security Considerations

- **Input Validation**: Comprehensive validation with Zod
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: Helmet.js for security middleware
- **Rate Limiting**: Protection against abuse
- **Environment Variables**: Secure configuration management

## 📈 Performance Optimization

### Backend
- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Caching Strategy**: Redis-ready architecture
- **Compression**: Gzip compression for responses

### Frontend
- **Code Splitting**: Lazy loading for better performance
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP format support
- **Caching**: React Query for intelligent caching

## �� Contributing

This project demonstrates my approach to collaborative development:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or updates
- `chore:` Maintenance tasks

## 📊 Metrics & Quality

- **Code Coverage**: >90% test coverage
- **Performance**: Lighthouse score >90
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: No known vulnerabilities
- **Bundle Size**: Optimized for production

## 🎯 Engineering Philosophy

As a **Senior Software Engineer**, I believe in:

1. **Product-First Thinking**: Building features that solve real user problems
2. **Quality Over Speed**: Writing maintainable, testable code
3. **Continuous Learning**: Embracing new tools and technologies
4. **AI Collaboration**: Using AI as a productivity multiplier, not a replacement
5. **Security by Design**: Implementing security best practices from day one
6. **Performance Awareness**: Building fast, scalable applications
7. **Documentation**: Making code self-documenting and well-documented

## �� Contact & Links

- **GitHub**: [https://github.com/murilo-campaner/curotec-assessment](https://github.com/murilo-campaner/curotec-assessment)
- **LinkedIn**: https://www.linkedin.com/in/murilo-campaner
- **Portfolio**: https://murilo-campaner.github.io/

---

**Built with ❤️ by Murilo Campaner**
*Senior Software Engineer | Product-Focused Developer | AI-Enhanced Engineering*

*This project demonstrates my approach to modern software engineering - leveraging cutting-edge tools while maintaining high standards of code quality, security, and user experience.*
