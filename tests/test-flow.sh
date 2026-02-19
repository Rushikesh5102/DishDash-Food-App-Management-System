#!/bin/bash

# --- Configuration ---
BASE_URL="http://localhost:3000"
LOGIN_URL="$BASE_URL/api/users/login"
SEARCH_URL="$BASE_URL/api/products/search"
TEST_EMAIL="test@example.com" # Replace with a valid test user email
TEST_PASSWORD="password123"   # Replace with a valid test user password
PRODUCT_NAME="Burger"

echo "--- Starting Test Flow ---"

# 1. Log in to get a JWT token
echo "Attempting to log in..."
LOGIN_RESPONSE=$(curl -s -X POST 
  -H "Content-Type: application/json" 
  -d "{"email":"$TEST_EMAIL","password":"$TEST_PASSWORD"}" 
  "$LOGIN_URL")

echo "Login Response: $LOGIN_RESPONSE"

# Extract JWT token
# This uses grep and sed to parse the JSON response.
# Assumes the token is returned directly as a string or within a 'token' field.
# Adjust if your login response structure is different.
JWT_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | sed 's/"token":"//;s/"//')

if [ -z "$JWT_TOKEN" ]; then
  echo "ERROR: Failed to extract JWT token from login response."
  echo "Please ensure the login endpoint works and returns a 'token' field."
  exit 1
fi

echo "Extracted JWT Token: $JWT_TOKEN"

# 2. Use the token to call the POST /api/products/search route
echo "Calling POST /api/products/search with product '$PRODUCT_NAME'..."
SEARCH_RESPONSE=$(curl -s -X POST 
  -H "Content-Type: application/json" 
  -H "Authorization: Bearer $JWT_TOKEN" 
  -d "{"productName":"$PRODUCT_NAME"}" 
  "$SEARCH_URL")

echo "--- Product Search Response ---"
echo "$SEARCH_RESPONSE"
echo "--- End Test Flow ---"
