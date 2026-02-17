from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from playwright.async_api import async_playwright
import random
import asyncio

app = FastAPI()

class CompareRequest(BaseModel):
    product_name: str

async def get_price_from_url(page, url, selector):
    try:
        # Mimic human behavior with a random delay
        await asyncio.sleep(random.uniform(1, 3))
        await page.goto(url, wait_until="domcontentloaded")
        
        # Wait for the price element to appear
        element = await page.wait_for_selector(selector, timeout=5000)
        price_text = await element.inner_text()
        return price_text
    except Exception as e:
        return None

@app.post("/compare")
async def compare_prices(request: CompareRequest):
    async with async_playwright() as p:
        # Launch stealthy browser
        browser = await p.chromium.launch(headless=True)
        # Use a real-looking User-Agent
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        # Example: Searching for the product on a sample site
        # Note: You will need to find the exact CSS selectors for Zomato/Swiggy
        results = []
        
        # Placeholder for actual scraping logic
        # price = await get_price_from_url(page, f"https://example-food-site.com/search?q={request.product_name}", ".price-tag")
        
        await browser.close()
        
        return {
            "product": request.product_name,
            "results": [
                {"platform": "Zomato", "price": "₹299", "status": "Mocked"},
                {"platform": "Swiggy", "price": "₹310", "status": "Mocked"}
            ]
        }