from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

class Item(BaseModel):
    item: str

@app.post("/scrape")
async def scrape_item(item: Item):
    # For now, return a mock list
    mock_prices = [
        {"platform": "Zomato", "price": 299},
        {"platform": "Swiggy", "price": 285},
    ]
    return mock_prices

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
