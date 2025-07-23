# Curotec - Full Stack Assessment

## 📋 Visão Geral

Projeto full-stack desenvolvido para o assessment da Curotec, implementando um sistema de gerenciamento de posts com funcionalidades avançadas de busca e paginação.

## 🛠 Stack Tecnológica

### Backend
- **Node.js 20** - Runtime JavaScript
- **Express 4** - Framework web
- **TypeScript 5** - Linguagem tipada
- **Prisma 5** - ORM para PostgreSQL
- **PostgreSQL 15** - Banco de dados relacional
- **Zod** - Validação de schemas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript 5** - Linguagem tipada
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS
- **React Query** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP

## 🚀 Setup Rápido

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- npm ou yarn

### 1. Clone e instale dependências
```bash
git clone <repository-url>
cd curotec

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

### 2. Configurar ambiente
```bash
# Na raiz do projeto
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Iniciar banco de dados
```bash
docker-compose up -d
```

### 4. Executar migrations e seed
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 5. Iniciar aplicação
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📁 Estrutura do Projeto

```
curotec/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── routes/          # Definição de rotas
│   │   ├── middlewares/     # Middlewares customizados
│   │   ├── utils/           # Utilitários
│   │   └── index.ts         # Entry point
│   ├── prisma/              # Schema e migrations
│   └── package.json
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   ├── hooks/           # Custom hooks
│   │   └── main.tsx         # Entry point
│   └── package.json
├── docker-compose.yml       # Configuração do PostgreSQL
├── .env.example            # Variáveis de ambiente
└── README.md               # Este arquivo
```

## 🔧 Funcionalidades

### ✅ Implementadas
- [x] CRUD completo de Posts
- [x] Busca otimizada com filtros
- [x] Paginação no backend e frontend
- [x] Debounce na busca (300ms)
- [x] UI otimista para operações CRUD
- [x] Validação de dados com Zod
- [x] Tratamento de erros padronizado
- [x] Cache inteligente com React Query

### 🎯 Bônus (Opcional)
- [ ] Autenticação JWT
- [ ] WebSockets para updates em tempo real
- [ ] Testes unitários e de integração

## 📚 Documentação da API

### Endpoints de Posts

#### Listar Posts
```bash
GET /api/posts
```

#### Buscar Posts
```bash
GET /api/posts/search?query=termo&page=1&limit=10&sort=createdAt
```

#### Obter Post por ID
```bash
GET /api/posts/:id
```

#### Criar Post
```bash
POST /api/posts
Content-Type: application/json

{
  "title": "Título do Post",
  "content": "Conteúdo do post...",
  "published": true
}
```

#### Atualizar Post
```bash
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado...",
  "published": false
}
```

#### Deletar Post
```bash
DELETE /api/posts/:id
```

## 🏗 Decisões Técnicas

### Backend
- **Prisma ORM**: Escolhido por sua tipagem forte e facilidade de uso com TypeScript
- **Zod**: Para validação de schemas com inferência de tipos
- **Arquitetura em camadas**: Controllers → Services → Repository para melhor separação de responsabilidades
- **Middleware de erro**: Padronização de respostas de erro com status codes apropriados

### Frontend
- **React Query**: Para gerenciamento de estado server-side com cache inteligente
- **TailwindCSS**: Para desenvolvimento rápido de UI responsiva
- **Debounce**: Implementado para otimizar performance da busca
- **Optimistic UI**: Para melhor experiência do usuário em operações CRUD

### Banco de Dados
- **PostgreSQL**: Escolhido por ser robusto e ter suporte nativo a JSON
- **Migrations**: Para versionamento do schema
- **Seed data**: Para popular dados iniciais de teste

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para o assessment da Curotec.
