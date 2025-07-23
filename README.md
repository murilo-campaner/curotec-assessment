# Curotec - Posts Management System

Um sistema completo de gerenciamento de posts com frontend React/TypeScript e backend Node.js/Express, incluindo funcionalidades de CRUD, busca, filtros e paginação.

## 🚀 Funcionalidades

### Backend API
- **CRUD completo** de posts (Create, Read, Update, Delete)
- **Busca e filtros** por título, conteúdo e status de publicação
- **Paginação** com ordenação personalizável
- **Validação** robusta com Zod
- **Documentação automática** com Swagger/OpenAPI
- **Tratamento de erros** centralizado
- **Banco de dados** PostgreSQL com Prisma ORM

### Frontend
- **Interface moderna** com TailwindCSS
- **Gerenciamento de estado** com React Query
- **Componentes reutilizáveis** com design system
- **Formulários** com validação em tempo real
- **Filtros visuais** e busca
- **Paginação** com navegação intuitiva
- **Loading states** e feedback visual

## 🛠️ Tecnologias

### Backend
- **Node.js** com Express
- **TypeScript** para type safety
- **PostgreSQL** como banco de dados
- **Prisma** como ORM
- **Zod** para validação
- **Swagger/OpenAPI** para documentação
- **Jest** para testes

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **TailwindCSS** para estilização
- **React Query** para gerenciamento de estado
- **Vitest** para testes
- **Testing Library** para testes de componentes

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 12+
- Docker (opcional)

### 1. Clone o repositório
```bash
git clone <repository-url>
cd curotec
```

### 2. Configure o banco de dados
```bash
# Com Docker (recomendado)
docker-compose up -d

# Ou configure PostgreSQL localmente
# Crie um banco de dados chamado 'curotec'
```

### 3. Configure as variáveis de ambiente
```bash
# Backend
cp backend/.env.example backend/.env
# Edite backend/.env com suas configurações

# Frontend
cp frontend/.env.example frontend/.env
# Edite frontend/.env com suas configurações
```

### 4. Instale as dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Configure o banco de dados
```bash
# Backend
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 6. Inicie os servidores
```bash
# Backend (em um terminal)
cd backend
npm run dev

# Frontend (em outro terminal)
cd frontend
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/api/health

## 📚 Documentação da API

A documentação completa da API está disponível em `/api-docs` quando o servidor backend estiver rodando.

### Endpoints Principais

#### Posts
- `GET /api/posts` - Listar todos os posts
- `GET /api/posts/search` - Buscar posts com filtros
- `GET /api/posts/:id` - Buscar post por ID
- `POST /api/posts` - Criar novo post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/posts/stats` - Estatísticas dos posts

#### Health Check
- `GET /api/health` - Status da API

### Exemplos de Uso

#### Criar um post
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Conteúdo do post...",
    "published": false
  }'
```

#### Buscar posts com filtros
```bash
curl "http://localhost:3001/api/posts/search?query=react&published=true&page=1&limit=10"
```

## 🧪 Testes

### Backend
```bash
cd backend
npm test              # Executar todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com cobertura
```

### Frontend
```bash
cd frontend
npm run test          # Executar todos os testes
npm run test:run      # Executar uma vez
npm run test:ui       # Interface visual
```

## 🏗️ Estrutura do Projeto

```
curotec/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── controllers/     # Controllers da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── routes/          # Definição de rotas
│   │   ├── middlewares/     # Middlewares customizados
│   │   ├── types/           # Tipos TypeScript
│   │   └── swagger.ts       # Configuração Swagger
│   ├── prisma/              # Schema e migrations
│   └── tests/               # Testes de integração
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   └── ui/          # Componentes base
│   │   ├── hooks/           # Hooks customizados
│   │   ├── services/        # Serviços de API
│   │   ├── types/           # Tipos TypeScript
│   │   └── test/            # Configuração de testes
│   └── tests/               # Testes de componentes
└── docker-compose.yml       # Configuração Docker
```

## 🎨 Design System

O projeto utiliza um design system consistente com:

### Componentes Base
- **Button**: Variantes primary, secondary, danger, ghost
- **Input**: Text, textarea, checkbox com validação
- **Modal**: Componente genérico para overlays
- **Pagination**: Navegação de páginas

### Classes CSS Utilitárias
- **Cores**: Sistema de cores consistente
- **Espaçamentos**: Grid system com TailwindCSS
- **Animações**: Transições suaves
- **Responsividade**: Mobile-first design

## 🔧 Scripts Disponíveis

### Backend
```bash
npm run dev          # Desenvolvimento com hot reload
npm run build        # Build para produção
npm run start        # Iniciar em produção
npm test             # Executar testes
npm run db:migrate   # Executar migrations
npm run db:seed      # Popular banco com dados
```

### Frontend
```bash
npm run dev          # Desenvolvimento com Vite
npm run build        # Build para produção
npm run preview      # Preview do build
npm run test         # Executar testes
npm run lint         # Linting
```

## 🚀 Deploy

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Servir arquivos da pasta dist/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Padrões de Commit

Este projeto segue o [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para suporte, envie um email para dev@curotec.com ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ pela equipe Curotec**
