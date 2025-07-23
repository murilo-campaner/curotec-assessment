# 🚂 Deploy Railway - Guia Rápido

## ⚠️ IMPORTANTE: Deploy Manual Necessário

Como este é um **monorepo**, o Railway não consegue detectar automaticamente os serviços. Siga estas instruções:

## 🚀 Deploy Passo a Passo

### 1. Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"
4. **NÃO** selecione "Deploy from GitHub repo" ainda

### 2. Criar Backend Service

1. No projeto criado, clique em "New Service"
2. Selecione "GitHub Repo"
3. Escolha o repositório `curotec`
4. **Root Directory**: `backend` ⚠️ **IMPORTANTE**
5. **Branch**: `main`
6. Nome: `curotec-backend`

### 3. Criar Frontend Service

1. Clique em "New Service" novamente
2. Selecione "GitHub Repo"
3. Escolha o repositório `curotec`
4. **Root Directory**: `frontend` ⚠️ **IMPORTANTE**
5. **Branch**: `main`
6. Nome: `curotec-frontend`

### 4. Criar Database Service

1. Clique em "New Service"
2. Selecione "Database" > "PostgreSQL"
3. Nome: `curotec-database`

### 5. Configurar Variáveis de Ambiente

#### Backend Variables
```env
DATABASE_URL=postgresql://... (copiar do service database)
NODE_ENV=production
FRONTEND_URL=https://curotec-frontend.railway.app
```

#### Frontend Variables
```env
VITE_API_URL=https://curotec-backend.railway.app
VITE_ENVIRONMENT=production
```

### 6. Configurar Database

1. Vá para o service `curotec-backend`
2. Aba "Variables" → Copie `DATABASE_URL`
3. Aba "Deployments" → Clique em "Deploy"
4. Após deploy, vá para "Settings" → "Custom Domains"
5. Copie a URL do backend

### 7. Configurar Frontend

1. Vá para o service `curotec-frontend`
2. Aba "Variables" → Configure `VITE_API_URL` com a URL do backend
3. Aba "Deployments" → Clique em "Deploy"

### 8. Executar Migrations

1. Vá para o service `curotec-backend`
2. Aba "Deployments" → Clique nos 3 pontos → "View Logs"
3. Execute no terminal:
```bash
railway run npm run prisma:migrate
railway run npm run prisma:seed
```

## 🔧 Deploy Manual com CLI

### Instalar Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Deploy Backend
```bash
cd backend
railway link
railway up
```

### Deploy Frontend
```bash
cd frontend
railway link
railway up
```

### Ou usar o script automático
```bash
./scripts/deploy.sh all
```

## ✅ Verificação

### Health Checks
```bash
# Backend
curl https://curotec-backend.railway.app/api/health

# Frontend
curl https://curotec-frontend.railway.app
```

### Testes em Produção
1. Acesse o frontend
2. Teste criar um post
3. Teste editar e deletar
4. Teste busca e filtros

## 🛠️ Troubleshooting

### Erro: "Nixpacks build failed"
- ✅ **Solução**: Use Root Directory correto (`backend/` ou `frontend/`)
- ❌ **Erro**: Tentar deploy da raiz do projeto

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está correto
- Execute migrations: `railway run npm run prisma:migrate`

### Erro: "CORS error"
- Verifique se `FRONTEND_URL` está configurado
- Confirme URLs dos serviços

### Erro: "Frontend não carrega"
- Verifique se `VITE_API_URL` está correto
- Confirme se backend está rodando

## 📊 URLs Finais

Após deploy bem-sucedido:
- **Frontend**: `https://curotec-frontend.railway.app`
- **Backend**: `https://curotec-backend.railway.app`
- **API Docs**: `https://curotec-backend.railway.app/api-docs`

## 🔄 Atualizações

### Deploy Automático (GitHub Actions)
- Push para `main` executa testes
- Deploy manual necessário via Railway Dashboard

### Deploy Manual
```bash
# Backend
cd backend && railway up

# Frontend
cd frontend && railway up
```

---

**Status**: ✅ Configurado para deploy manual
**Última atualização**: Julho 2024
