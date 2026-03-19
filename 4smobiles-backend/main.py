from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import models
from database import engine
from routers import products, admin

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="4S Mobile API", version="1.0.0")

# CORS — allow Netlify frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["4S Mobile https://share.google/S16LvVugvi0eUz69s"],   # change to ["https://4smobiles.netlify.app"] in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(products.router)
app.include_router(admin.router)

# Serve admin.html at /admin
app.mount("/static", StaticFiles(directory="templates"), name="static")

@app.get("/admin-panel")
def serve_admin():
    return FileResponse("templates/admin.html")

@app.get("/")
def root():
    return {"message": "4S Mobile API is running 🚀"}