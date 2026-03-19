from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models, schemas
from database import get_db

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/", response_model=List[schemas.ProductOut])
def get_products(
    brand:  Optional[str] = None,
    search: Optional[str] = None,
    db:     Session = Depends(get_db)
):
    query = db.query(models.Product)

    if brand:
        query = query.filter(models.Product.brand == brand.lower())

    if search:
        query = query.filter(models.Product.name.ilike(f"%{search}%"))

    return query.all()


@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product