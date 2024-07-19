#!/bin/bash

# Echo constants
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
RESET='\033[0m'

# Load env variables
export $(grep -v '^#SONAR_TOKEN' .env | xargs)
export $(grep -v '^#SONAR_HOST_URL' .env | xargs)

# Run sonar scanner
yarn run sonar

# Quality gate check
response=$(curl -s -H "Authorization: Bearer ${SONAR_TOKEN}" "${SONAR_HOST_URL}/api/qualitygates/project_status?projectKey=Portfolio")

status=$(echo $response | jq -r '.projectStatus.status')

# Create a badge depending on the status
if [ "$status" != "OK" ]; then
  echo -e "${YELLOW}##########################################${RESET}"
  echo -e "${RED}${BOLD}      ⚠️  Quality Gate failed! ⚠️      ${RESET}"
  echo -e "${YELLOW}##########################################${RESET}"
  npx badge-maker "quality gate" "failed" "red" > documentation/assets/badges/sonar-badge.svg
  exit 1
else
  echo -e "${YELLOW}##########################################${RESET}"
  echo -e "${GREEN}${BOLD}      ✅  Quality Gate passed! ✅      ${RESET}"
  echo -e "${YELLOW}##########################################${RESET}"
  npx badge-maker "quality gate" "passed" "green" > documentation/assets/badges/sonar-badge.svg
fi
