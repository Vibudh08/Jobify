#!/usr/bin/env bash
# Install root dependencies first
echo "🛠 Installing root dependencies..."
npm install

# Then build client
echo "🎨 Building client..."
cd client
npm install
npm run build
cd ..
