# Arquitetura do Projeto Curotec

## 📋 Visão Geral

Este documento descreve a arquitetura, padrões e decisões técnicas do sistema de gerenciamento de posts da Curotec.

## 🏗️ Arquitetura Geral

O projeto segue uma arquitetura **Full-Stack** com separação clara entre frontend e backend:

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │    Backend      │
│   (React)       │                 │   (Node.js)     │
└─────────────────┘                 └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   PostgreSQL    │
                                    │   Database      │
                                    └─────────────────┘
```

### Princípios Arquiteturais

1. **Separação de Responsabilidades**: Cada camada tem responsabilidades bem definidas
2. **Escalabilidade**: Arquitetura preparada para crescimento
3. **Manutenibilidade**: Código organizado e documentado
4. **Testabilidade**: Estrutura que facilita testes
5. **Performance**: Otimizações em cada camada

## 🔧 Backend Architecture

### Padrão Arquitetural: Clean Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Controllers Layer                     │
│              (HTTP Request/Response)                     │
├─────────────────────────────────────────────────────────┤
│                     Services Layer                       │
│              (Business Logic)                            │
├─────────────────────────────────────────────────────────┤
│                   Repository Layer                       │
│              (Data Access)                               │
├─────────────────────────────────────────────────────────┤
│                    Database Layer                        │
│              (PostgreSQL + Prisma)                       │
└─────────────────────────────────────────────────────────┘
```

### Estrutura de Pastas

```
backend/
├── src/
│   ├── controllers/          # Camada de Controllers
│   │   ├── postController.ts # Lógica de HTTP
│   │   └── index.ts
│   ├── services/             # Camada de Serviços
│   │   ├── postService.ts    # Lógica de Negócio
│   │   └── index.ts
│   ├── routes/               # Definição de Rotas
│   │   ├── posts.ts          # Rotas de Posts
│   │   ├── health.ts         # Health Check
│   │   └── index.ts
│   ├── middlewares/          # Middlewares Customizados
│   │   ├── errorHandler.ts   # Tratamento de Erros
│   │   ├── validation.ts     # Validação com Zod
│   │   └── index.ts
│   ├── types/                # Tipos TypeScript
│   │   ├── post.ts           # Schemas e Tipos
│   │   └── index.ts
│   ├── swagger.ts            # Configuração Swagger
│   └── index.ts              # Entry Point
├── prisma/                   # ORM e Migrations
│   ├── schema.prisma         # Schema do Banco
│   ├── migrations/           # Migrations
│   └── seed.ts               # Dados Iniciais
└── tests/                    # Testes
    ├── unit/                 # Testes Unitários
    ├── integration/          # Testes de Integração
    └── setup.ts              # Configuração de Testes
```

### Decisões Técnicas

#### 1. **Express.js + TypeScript**
- **Motivo**: Framework maduro com excelente suporte a TypeScript
- **Benefícios**: Tipagem forte, intellisense, refactoring seguro

#### 2. **Prisma ORM**
- **Motivo**: ORM moderno com tipagem automática
- **Benefícios**: Type safety, migrations automáticas, query builder intuitivo

#### 3. **Zod para Validação**
- **Motivo**: Validação com inferência de tipos
- **Benefícios**: Runtime validation + compile-time types

#### 4. **Arquitetura em Camadas**
- **Controllers**: Responsáveis por HTTP
- **Services**: Lógica de negócio
- **Repository**: Acesso a dados (via Prisma)

## 🎨 Frontend Architecture

### Padrão Arquitetural: Component-Based Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│              (Components + UI)                          │
├─────────────────────────────────────────────────────────┤
│                     Business Layer                       │
│              (Hooks + State Management)                 │
├─────────────────────────────────────────────────────────┤
│                    Data Layer                            │
│              (API Services + React Query)               │
├─────────────────────────────────────────────────────────┤
│                    External Layer                        │
│              (Backend API)                              │
└─────────────────────────────────────────────────────────┘
```

### Estrutura de Pastas

```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes Base
│   │   │   ├── Button.tsx   # Botão reutilizável
│   │   │   ├── Input.tsx    # Input reutilizável
│   │   │   └── Modal.tsx    # Modal genérico
│   │   ├── PostCard.tsx     # Card de Post
│   │   ├── PostForm.tsx     # Formulário de Post
│   │   ├── PostList.tsx     # Lista de Posts
│   │   └── SearchBar.tsx    # Barra de Busca
│   ├── hooks/               # Hooks Customizados
│   │   ├── usePosts.ts      # Hook para Posts
│   │   └── usePostMutations.ts # Hook para Mutations
│   ├── services/            # Serviços de API
│   │   └── postsApi.ts      # Cliente da API
│   ├── types/               # Tipos TypeScript
│   │   ├── post.ts          # Tipos de Post
│   │   └── base.ts          # Tipos Base
│   ├── test/                # Configuração de Testes
│   │   └── setup.ts         # Setup Vitest
│   ├── App.tsx              # Componente Principal
│   └── main.tsx             # Entry Point
├── tests/                   # Testes
│   ├── components/          # Testes de Componentes
│   ├── hooks/               # Testes de Hooks
│   └── setup.ts             # Configuração
└── public/                  # Assets Estáticos
```

### Decisões Técnicas

#### 1. **React 18 + TypeScript**
- **Motivo**: Biblioteca madura com suporte a TypeScript
- **Benefícios**: Componentes tipados, melhor DX

#### 2. **React Query (TanStack Query)**
- **Motivo**: Gerenciamento de estado server-side
- **Benefícios**: Cache inteligente, sincronização automática, optimistic updates

#### 3. **TailwindCSS**
- **Motivo**: Framework CSS utilitário
- **Benefícios**: Desenvolvimento rápido, design consistente

#### 4. **Vite**
- **Motivo**: Build tool moderno
- **Benefícios**: HMR rápido, configuração simples

## 🗄️ Database Architecture

### Schema Design

```sql
-- Tabela de Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para Performance
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_posts_title_content ON posts USING gin(to_tsvector('english', title || ' ' || content));
```

### Decisões de Design

#### 1. **PostgreSQL**
- **Motivo**: Banco relacional robusto
- **Benefícios**: ACID, JSON support, full-text search

#### 2. **Índices Otimizados**
- **published**: Para filtros rápidos
- **created_at**: Para ordenação
- **full-text**: Para busca em título e conteúdo

#### 3. **Timestamps Automáticos**
- **created_at**: Preenchido automaticamente
- **updated_at**: Atualizado automaticamente

## 🔄 API Design

### RESTful Endpoints

```
GET    /api/posts           # Listar todos os posts
GET    /api/posts/search    # Buscar com filtros
GET    /api/posts/:id       # Buscar por ID
POST   /api/posts           # Criar novo post
PUT    /api/posts/:id       # Atualizar post
DELETE /api/posts/:id       # Deletar post
GET    /api/posts/stats     # Estatísticas
GET    /api/health          # Health check
```

### Padrões de Resposta

#### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Erro
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/posts"
  }
}
```

### Validação

- **Zod Schemas**: Validação de entrada
- **HTTP Status Codes**: Respostas padronizadas
- **Error Handling**: Middleware centralizado

## 🧪 Testing Strategy

### Backend Testing

#### 1. **Testes Unitários**
- **Ferramenta**: Jest
- **Cobertura**: Services, Utils
- **Mock**: Prisma Client

#### 2. **Testes de Integração**
- **Ferramenta**: Jest + Supertest
- **Cobertura**: Controllers, Rotas
- **Database**: Test database isolado

#### 3. **Testes E2E**
- **Ferramenta**: Jest + Supertest
- **Cobertura**: Fluxos completos

### Frontend Testing

#### 1. **Testes Unitários**
- **Ferramenta**: Vitest
- **Cobertura**: Hooks, Utils

#### 2. **Testes de Componentes**
- **Ferramenta**: Vitest + Testing Library
- **Cobertura**: Componentes isolados

#### 3. **Testes de Integração**
- **Ferramenta**: Vitest + Testing Library
- **Cobertura**: Fluxos de usuário

## 🔒 Security Considerations

### Backend Security

1. **Input Validation**: Zod schemas
2. **SQL Injection**: Prisma ORM
3. **CORS**: Configurado adequadamente
4. **Rate Limiting**: Implementar se necessário
5. **Helmet**: Headers de segurança

### Frontend Security

1. **XSS Prevention**: React sanitization
2. **CSRF Protection**: Tokens se necessário
3. **Content Security Policy**: Headers apropriados

## 📈 Performance Optimization

### Backend Performance

1. **Database Indexes**: Otimizados para queries
2. **Connection Pooling**: Prisma configuração
3. **Caching**: Redis se necessário
4. **Compression**: gzip/brotli

### Frontend Performance

1. **Code Splitting**: Lazy loading
2. **Bundle Optimization**: Vite configuração
3. **Image Optimization**: WebP format
4. **Caching**: React Query cache

## 🚀 Deployment Architecture

### Development
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │    │   Backend   │    │ PostgreSQL  │
│   (Vite)    │    │  (Express)  │    │   (Docker)  │
│   :5173     │    │   :3001     │    │   :5432     │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Production
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   Backend   │    │ PostgreSQL  │
│  (Static)   │    │  (Express)  │    │  (Managed)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🔄 CI/CD Pipeline

### Stages

1. **Lint**: ESLint + Prettier
2. **Test**: Jest + Vitest
3. **Build**: TypeScript compilation
4. **Deploy**: Automatic deployment

### Tools

- **GitHub Actions**: CI/CD
- **Docker**: Containerization
- **Nginx**: Reverse proxy

## 📊 Monitoring & Logging

### Backend Monitoring

1. **Health Checks**: `/api/health`
2. **Error Logging**: Winston
3. **Performance**: Response time tracking
4. **Database**: Query performance

### Frontend Monitoring

1. **Error Tracking**: Error boundaries
2. **Performance**: Core Web Vitals
3. **Analytics**: User behavior

## 🔮 Future Considerations

### Scalability

1. **Microservices**: Decomposição se necessário
2. **Load Balancing**: Múltiplas instâncias
3. **Caching**: Redis para cache
4. **CDN**: Para assets estáticos

### Features

1. **Authentication**: JWT + OAuth
2. **Real-time**: WebSockets
3. **File Upload**: Cloud storage
4. **Search**: Elasticsearch

## 📚 Guias de Contribuição

### Padrões de Código

1. **TypeScript**: Strict mode
2. **ESLint**: Configuração padronizada
3. **Prettier**: Formatação automática
4. **Conventional Commits**: Padrão de commits

### Processo de Desenvolvimento

1. **Feature Branch**: `feature/nome-da-feature`
2. **Pull Request**: Code review obrigatório
3. **Tests**: Cobertura mínima 80%
4. **Documentation**: Atualizar docs

### Code Review Checklist

- [ ] Código segue padrões
- [ ] Tests passando
- [ ] Documentação atualizada
- [ ] Performance adequada
- [ ] Security considerations

---

**Última atualização**: Julho 2024
**Versão**: 1.0.0
