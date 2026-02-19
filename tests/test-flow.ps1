# --- Configuration ---
$BASE_URL = "http://localhost:3000"
$LOGIN_URL = "$BASE_URL/api/users/login"
$SEARCH_URL = "$BASE_URL/api/products/search"
$TEST_EMAIL = "test@example.com" # Replace with a valid test user email
$TEST_PASSWORD = "password123"   # Replace with a valid test user password
$PRODUCT_NAME = "Burger"

Write-Host "--- Starting Test Flow ---"

# 1. Log in to get a JWT token
Write-Host "Attempting to log in..."
$LOGIN_BODY = @{
    email = $TEST_EMAIL
    password = $TEST_PASSWORD
} | ConvertTo-Json

try {
    $LOGIN_RESPONSE = Invoke-RestMethod -Uri $LOGIN_URL -Method Post -Headers @{"Content-Type" = "application/json"} -Body $LOGIN_BODY -ErrorAction Stop
} catch {
    Write-Host "ERROR: Failed to connect to login endpoint or received an error response."
    Write-Host "Error details: $($_.Exception.Message)"
    exit 1
}


Write-Host "Login Response: $($LOGIN_RESPONSE | ConvertTo-Json -Depth 100)"

# Extract JWT token
# Assumes the token is returned within a 'token' field in the JSON response.
if ($LOGIN_RESPONSE.token) {
    $JWT_TOKEN = $LOGIN_RESPONSE.token
} else {
    Write-Host "ERROR: Failed to extract JWT token from login response."
    Write-Host "Please ensure the login endpoint works and returns a 'token' field."
    exit 1
}

Write-Host "Extracted JWT Token: $JWT_TOKEN"

# 2. Use the token to call the POST /api/products/search route
Write-Host "Calling POST /api/products/search with product '$PRODUCT_NAME'..."
$SEARCH_BODY = @{
    productName = $PRODUCT_NAME
} | ConvertTo-Json

try {
    $SEARCH_RESPONSE = Invoke-RestMethod -Uri $SEARCH_URL -Method Post -Headers @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $JWT_TOKEN"
    } -Body $SEARCH_BODY -ErrorAction Stop
} catch {
    Write-Host "ERROR: Failed to connect to product search endpoint or received an error response."
    Write-Host "Error details: $($_.Exception.Message)"
    exit 1
}

Write-Host "--- Product Search Response ---"
Write-Host "$($SEARCH_RESPONSE | ConvertTo-Json -Depth 100)"
Write-Host "--- End Test Flow ---"
