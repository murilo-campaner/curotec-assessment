#!/bin/bash

# Script de Deploy para Railway
# Uso: ./scripts/deploy.sh [backend|frontend|all]

set -e

echo "🚂 Railway Deploy Script"
echo "========================"

# Verificar se Railway CLI está instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI não está instalado"
    echo "Instale com: npm install -g @railway/cli"
    exit 1
fi

# Verificar se está logado no Railway
if ! railway whoami &> /dev/null; then
    echo "❌ Não está logado no Railway"
    echo "Execute: railway login"
    exit 1
fi

deploy_backend() {
    echo "🔧 Deployando Backend..."
    cd backend

    # Verificar se está linkado ao projeto
    if [ ! -f ".railway" ]; then
        echo "📎 Linkando backend ao Railway..."
        railway link
    fi

    echo "🚀 Fazendo deploy do backend..."
    railway up

    cd ..
    echo "✅ Backend deployado com sucesso!"
}

deploy_frontend() {
    echo "🎨 Deployando Frontend..."
    cd frontend

    # Verificar se está linkado ao projeto
    if [ ! -f ".railway" ]; then
        echo "📎 Linkando frontend ao Railway..."
        railway link
    fi

    echo "🚀 Fazendo deploy do frontend..."
    railway up

    cd ..
    echo "✅ Frontend deployado com sucesso!"
}

deploy_database() {
    echo "🗄️ Configurando Database..."
    cd backend

    echo "🔄 Executando migrations..."
    railway run npm run prisma:migrate

    echo "🌱 Executando seed (opcional)..."
    railway run npm run prisma:seed

    cd ..
    echo "✅ Database configurado com sucesso!"
}

case "${1:-all}" in
    "backend")
        deploy_backend
        ;;
    "frontend")
        deploy_frontend
        ;;
    "database")
        deploy_database
        ;;
    "all")
        echo "🔄 Deploy completo..."
        deploy_backend
        deploy_frontend
        deploy_database
        ;;
    *)
        echo "❌ Uso: $0 [backend|frontend|database|all]"
        echo ""
        echo "Opções:"
        echo "  backend   - Deploy apenas do backend"
        echo "  frontend  - Deploy apenas do frontend"
        echo "  database  - Configurar database"
        echo "  all       - Deploy completo (padrão)"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deploy concluído!"
echo "📊 Verifique os logs no Railway Dashboard"
