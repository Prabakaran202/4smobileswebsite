from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import models
from database import engine
from routers import products, admin

from routers import accessories
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="4S Mobile API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://4smobiles.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(admin.router)
app.include_router(accessories.router)

app.mount("/static", StaticFiles(directory="templates"), name="static")

@app.get("/admin-panel")
def serve_admin():
    return FileResponse("templates/admin.html")

@app.get("/")
def root():
    return {"message": "4S Mobile API is running 🚀"}