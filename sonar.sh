#!/bin/bash

# Load env variables
export $(grep -v '^#SONAR_TOKEN' .env | xargs)
export $(grep -v '^#SONAR_HOST_URL' .env | xargs)

# Run sonar scanner
npm run sonar

# Quality gate check
response=$(curl -s -H "Authorization: Bearer ${SONAR_TOKEN}" "${SONAR_HOST_URL}/api/qualitygates/project_status?projectKey=Portfolio")

status=$(echo $response | jq -r '.projectStatus.status')

# Create a badge depending on the status
if [ "$status" != "OK" ]; then
  echo "Quality Gate failed!"
  npx badge-maker "quality gate" "failed" "red" > documentation/badges/sonar-badge.svg
  exit 1
else
  echo "Quality Gate passed!"
  npx badge-maker "quality gate" "passed" "green" > documentation/badges/sonar-badge.svg
fi
