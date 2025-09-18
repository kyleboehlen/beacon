#!/bin/bash
# deploy.sh

echo "🚀 Starting Beacon Backend Deployment"

echo "🔍 Checking for Azure CLI..."
az --version

echo "👤 Logging in to Azure..."

az login --service-principal \
  --username $APP_ID \
  --password $PASSWORD \
  --tenant $TENANT

# Prerequisites check
echo "Checking prerequisites..."

# Check if resource group exists
if ! az group show --name beacon-prod-rg-eastus2 &> /dev/null; then
    echo "❌ Resource group beacon-prod-rg-eastus2 does not exist"
    echo "Create it with: az group create --name beacon-prod-rg-eastus2 --location eastus2"
    exit 1
else 
      echo "✅ Resource group exists..."
fi

# Check if environment exists
if ! az containerapp env show --name beacon-prod-env-eastus2 --resource-group beacon-prod-rg-eastus2 &> /dev/null; then
    echo "❌ Container App environment beacon-prod-env-eastus2 does not exist."
    echo "Create it with: az containerapp env create --name beacon-prod-env-eastus2 --resource-group beacon-prod-rg-eastus2 --location eastus2"
    exit 1
else 
      echo "✅ Container app environment exists..."
fi

if ! az containerapp env certificate list \
    --name beacon-prod-env-eastus2 \
    --resource-group beacon-prod-rg-eastus2 \
    --query "[?properties.subjectName=='backend.beaconconsole.net'].name" \
    --output tsv | grep -q "backend.beaconconsole.net-beacon-p-250917202524"; then
    
    echo "❌ Certificate for backend.beaconconsole.net does not exist, please created it in the Azure Container Apps Environment portal."
    exit 1
else 
      echo "✅ Certificate for backend.beaconconsole.net exists..."
fi

echo "✅ All prerequisites met."

echo "✏️ Getting current image..."
IMAGE_NAME="${BEACON_IMAGE:-kboehlen/beacon-backend:latest}"
echo "📝 Using image: $IMAGE_NAME"
echo "☁️ Deploying to Azure Container Apps..."

# Deploy container app
az containerapp create \
  --name beacon-prod-backend-eastus2 \
  --resource-group beacon-prod-rg-eastus2 \
  --environment beacon-prod-env-eastus2 \
  --image "$IMAGE_NAME" \
  --secrets \
     beacon-smtp-password="$SMTP_PASSWORD" \
     beacon-mongodb-connection-string="$MONGODB_CONNECTION_STRING" \
  --env-vars \
     ASPNETCORE_ENVIRONMENT=Production \
     SMTP_PASSWORD=secretref:beacon-smtp-password \
     MONGODB_CONNECTION_STRING=secretref:beacon-mongodb-connection-string \
  --ingress external \
  --target-port 8080 \
  --min-replicas 0 \
  --max-replicas 1 \
  
echo "🔧 Configuring CORS settings..."
az containerapp ingress cors enable --name beacon-prod-backend-eastus2 \
  --resource-group beacon-prod-rg-eastus2 \
  --allowed-origins "https://beaconconsole.net" \
  --allowed-methods "GET" "POST" "PUT" "DELETE" "OPTIONS" \
  --allowed-headers "Content-Type" "Authorization" "X-Requested-With" "Accept"
  
echo "🌐 Adding custom domain..."
az containerapp hostname add \
  --hostname "backend.beaconconsole.net" \
  --name beacon-prod-backend-eastus2 \
  --resource-group beacon-prod-rg-eastus2
  
echo "🪢 Binding SSL certificate..."
az containerapp hostname bind \
      --hostname "backend.beaconconsole.net" \
      --name beacon-prod-backend-eastus2 \
      --resource-group beacon-prod-rg-eastus2 \
      --environment beacon-prod-env-eastus2 \
      --certificate "backend.beaconconsole.net-beacon-p-250917202524"

echo "🎉 Deployment complete!"