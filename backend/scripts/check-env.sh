#!/bin/bash

echo "🔍 Checking environment variables..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set!"
    echo "Please configure DATABASE_URL in Railway environment variables"
    exit 1
else
    echo "✅ DATABASE_URL is configured"
    # Mask the password for security
    echo "Database URL: ${DATABASE_URL//:*/:***@*}"
fi

# Check if NODE_ENV is set
if [ -z "$NODE_ENV" ]; then
    echo "⚠️  NODE_ENV is not set, defaulting to production"
    export NODE_ENV=production
else
    echo "✅ NODE_ENV is set to: $NODE_ENV"
fi

# Check if PORT is set
if [ -z "$PORT" ]; then
    echo "⚠️  PORT is not set, defaulting to 3001"
    export PORT=3001
else
    echo "✅ PORT is set to: $PORT"
fi

echo "🎉 Environment check completed!"
