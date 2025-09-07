#!/bin/bash

echo "🚀 Preparing LinkedIn Content Generator for deployment..."

# Build the backend
echo "📦 Building backend..."
cd backend
mvn clean package -DskipTests
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend on Railway: https://railway.app"
echo "3. Deploy frontend on Vercel: https://vercel.com"
echo "4. Update environment variables in both platforms"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed instructions"
