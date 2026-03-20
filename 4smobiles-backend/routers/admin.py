from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredential
from typing import List
from sqlalchemy.orm import Session
import jwt, os
from datetime import datetime, timedelta

import models, schemas
from database import get_db

router    = APIRouter(prefix="/admin", tags=["Admin"])
security  = HTTPBearer()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "4smobile2024")
JWT_SECRET     = os.getenv("JWT_SECRET", "praba")
JWT_ALGO       = "HS256"


# ── Auth helpers ──
def create_token():
    payload = {"exp": datetime.utcnow() + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ── Login ──
@router.post("/login", response_model=schemas.TokenOut)
def login(body: schemas.AdminLogin):
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Wrong password")
    return {"access_token": create_token()}


# ── Products CRUD ──
@router.post("/products", response_model=schemas.ProductOut, dependencies=[Depends(verify_token)])
def create_product(body: schemas.ProductCreate, db: Session = Depends(get_db)):
    product = models.Product(
        brand   = body.brand.lower(),
        name    = body.name,
        img_url = body.img_url
    )
    db.add(product)
    db.flush()  # get product.id before adding variants

    for v in body.variants:
        db.add(models.Variant(product_id=product.id, **v.model_dump()))

    db.commit()
    db.refresh(product)
    return product
@router.post("/accessories", response_model=schemas.AccessoryOut, dependencies=[Depends(verify_token)])
def create_accessory(body: schemas.AccessoryCreate, db: Session = Depends(get_db)):
    acc = models.Accessory(**body.model_dump())
    db.add(acc); db.commit(); db.refresh(acc)
    return acc

@router.get("/accessories", response_model=List[schemas.AccessoryOut], dependencies=[Depends(verify_token)])
def list_accessories(db: Session = Depends(get_db)):
    return db.query(models.Accessory).all()

@router.put("/products/{product_id}", response_model=schemas.ProductOut, dependencies=[Depends(verify_token)])
def update_product(product_id: int, body: schemas.ProductUpdate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for field, value in body.model_dump(exclude_none=True).items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/products/{product_id}", dependencies=[Depends(verify_token)])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Deleted"}


# ── Variants CRUD ──
@router.post("/products/{product_id}/variants", response_model=schemas.VariantOut, dependencies=[Depends(verify_token)])
def add_variant(product_id: int, body: schemas.VariantCreate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    variant = models.Variant(product_id=product_id, **body.model_dump())
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant


@router.put("/variants/{variant_id}", response_model=schemas.VariantOut, dependencies=[Depends(verify_token)])
def update_variant(variant_id: int, body: schemas.VariantUpdate, db: Session = Depends(get_db)):
    variant = db.query(models.Variant).filter(models.Variant.id == variant_id).first()
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")

    for field, value in body.model_dump(exclude_none=True).items():
        setattr(variant, field, value)

    db.commit()
    db.refresh(variant)
    return variant


@router.delete("/variants/{variant_id}", dependencies=[Depends(verify_token)])
def delete_variant(variant_id: int, db: Session = Depends(get_db)):
    variant = db.query(models.Variant).filter(models.Variant.id == variant_id).first()
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")
    db.delete(variant)
    db.commit()
    return {"message": "Deleted"}
# ── Accessories CRUD ──
from typing import List

@router.put("/accessories/{acc_id}", response_model=schemas.AccessoryOut, dependencies=[Depends(verify_token)])
def update_accessory(acc_id: int, body: schemas.AccessoryUpdate, db: Session = Depends(get_db)):
    acc = db.query(models.Accessory).filter(models.Accessory.id == acc_id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(acc, field, value)
    db.commit(); db.refresh(acc)
    return acc

@router.delete("/accessories/{acc_id}", dependencies=[Depends(verify_token)])
def delete_accessory(acc_id: int, db: Session = Depends(get_db)):
    acc = db.query(models.Accessory).filter(models.Accessory.id == acc_id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(acc); db.commit()
    return {"message": "Deleted"}