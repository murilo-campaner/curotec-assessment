#!/bin/bash

echo "🚀 Starting post-deploy script..."

# Run database migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy

# Check if migrations were successful
if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Migration failed"
    exit 1
fi

# Run database seed
echo "🌱 Running database seed..."
npx prisma db seed

# Check if seed was successful
if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "❌ Seed failed"
    exit 1
fi

echo "🎉 Post-deploy script completed successfully!"
