#!/usr/bin/env bash
export $(grep -v '^#SONAR_TOKEN' .env | xargs) && npm run sonar
