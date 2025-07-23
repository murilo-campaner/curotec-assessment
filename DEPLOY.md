# 🚂 Deploy no Railway

Este guia explica como fazer deploy do projeto Curotec no Railway.

## 📋 Pré-requisitos

1. **Conta no Railway**: [railway.app](https://railway.app)
2. **Conta no GitHub**: Para conectar o repositório
3. **Railway CLI** (opcional): Para deploy manual

## 🚀 Deploy Automático (Recomendado)

### 1. Conectar GitHub ao Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha o repositório `curotec`
6. **IMPORTANTE**: Não faça deploy da raiz, vamos configurar os serviços separadamente

### 2. Configurar Serviços

**IMPORTANTE**: Como é um monorepo, precisamos criar os serviços manualmente:

#### Passo 1: Criar Backend Service
1. No projeto Railway, clique em "New Service"
2. Selecione "GitHub Repo"
3. Escolha o repositório `curotec`
4. **Root Directory**: `backend`
5. **Branch**: `main`
6. Nome: `curotec-backend`

#### Passo 2: Criar Frontend Service
1. Clique em "New Service" novamente
2. Selecione "GitHub Repo"
3. Escolha o repositório `curotec`
4. **Root Directory**: `frontend`
5. **Branch**: `main`
6. Nome: `curotec-frontend`

#### Passo 3: Criar Database Service
1. Clique em "New Service"
2. Selecione "Database" > "PostgreSQL"
3. Nome: `curotec-database`

#### Backend Service
- **Nome**: `curotec-backend`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: Automático (nixpacks)
- **Start Command**: `npm start`

#### Frontend Service
- **Nome**: `curotec-frontend`
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: Automático (nixpacks)
- **Start Command**: `npm run preview`

#### Database Service
- **Tipo**: PostgreSQL
- **Nome**: `curotec-database`

### 3. Configurar Variáveis de Ambiente

#### Backend Variables
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
FRONTEND_URL=https://curotec-frontend.railway.app
```

#### Frontend Variables
```env
VITE_API_URL=https://curotec-backend.railway.app
VITE_ENVIRONMENT=production
```

### 4. Configurar GitHub Actions

1. Vá para o repositório no GitHub
2. Acesse Settings > Secrets and variables > Actions
3. Adicione o secret `RAILWAY_TOKEN`:
   - Vá para Railway Dashboard
   - Account > Tokens
   - Crie um novo token
   - Copie o token para o GitHub secret

### 5. Deploy Automático

Após configurar tudo:
1. Faça push para a branch `main`
2. O GitHub Actions executará os testes
3. Se os testes passarem, fará deploy automático
4. O Railway atualizará os serviços

## 🔧 Deploy Manual

### 1. Instalar Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login no Railway
```bash
railway login
```

### 3. Deploy Backend
```bash
cd backend
railway login
railway link
railway up
```

### 4. Deploy Frontend
```bash
cd frontend
railway login
railway link
railway up
```

## 🗄️ Configuração do Banco de Dados

### 1. Criar PostgreSQL no Railway
1. No projeto Railway, clique em "New Service"
2. Selecione "Database" > "PostgreSQL"
3. Aguarde a criação

### 2. Configurar Migrations
```bash
# No Railway Dashboard, vá para o service do backend
# Aba "Variables" e adicione:
DATABASE_URL=postgresql://...

# Execute as migrations
railway run npm run prisma:migrate
```

### 3. Seed do Banco
```bash
# Opcional: Popular com dados iniciais
railway run npm run prisma:seed
```

## 🔍 Verificação do Deploy

### 1. Health Check
```bash
# Backend
curl https://curotec-backend.railway.app/api/health

# Frontend
curl https://curotec-frontend.railway.app
```

### 2. Logs
- Railway Dashboard > Service > Logs
- Verifique se não há erros
- Confirme que os serviços estão rodando

### 3. Testes em Produção
- Acesse o frontend
- Teste criar, editar, deletar posts
- Verifique se a busca funciona
- Teste filtros e paginação

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Build Fails
```bash
# Verifique os logs no Railway Dashboard
# Confirme que todas as dependências estão no package.json
# Verifique se o Node.js version está correto
```

#### 2. Database Connection
```bash
# Verifique se DATABASE_URL está correto
# Confirme se o PostgreSQL está rodando
# Execute migrations: railway run npm run prisma:migrate
```

#### 3. CORS Errors
```bash
# Verifique se FRONTEND_URL está configurado
# Confirme que as URLs estão corretas
# Verifique os logs do backend
```

#### 4. Frontend não carrega
```bash
# Verifique se VITE_API_URL está correto
# Confirme se o backend está rodando
# Verifique os logs do frontend
```

### Comandos Úteis

```bash
# Ver logs em tempo real
railway logs

# Executar comando no service
railway run npm run prisma:migrate

# Reiniciar service
railway service restart

# Ver status dos serviços
railway status
```

## 📊 Monitoramento

### Railway Dashboard
- **Metrics**: CPU, Memory, Network
- **Logs**: Logs em tempo real
- **Deployments**: Histórico de deploys
- **Variables**: Configurações

### Health Checks
- Backend: `/api/health`
- Frontend: `/` (página principal)

## 🔄 Atualizações

### Deploy Automático
1. Faça push para `main`
2. GitHub Actions executa testes
3. Se OK, deploy automático
4. Railway atualiza serviços

### Deploy Manual
```bash
# Backend
cd backend && railway up

# Frontend
cd frontend && railway up
```

## 💰 Custos

### Estimativa Mensal
- **PostgreSQL**: ~$5-10/mês
- **Backend**: ~$5-10/mês
- **Frontend**: ~$5/mês
- **Total**: ~$15-25/mês

### Otimizações
- Use Railway Hobby plan (gratuito para começar)
- Configure auto-sleep para desenvolvimento
- Monitore uso de recursos

## 🔐 Segurança

### Variáveis Sensíveis
- Nunca commite `.env` files
- Use Railway Variables para secrets
- Rotacione tokens regularmente

### HTTPS
- Railway fornece HTTPS automático
- Certificados SSL automáticos
- Sem configuração adicional

---

**Status**: ✅ Pronto para deploy
**Última atualização**: Julho 2024
