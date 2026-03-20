from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import models, schemas
from database import get_db

router = APIRouter(prefix="/accessories", tags=["Accessories"])


@router.get("/", response_model=List[schemas.AccessoryOut])
def get_accessories(
    category: Optional[str] = None,
    search:   Optional[str] = None,
    db:       Session = Depends(get_db)
):
    query = db.query(models.Accessory)
    if category:
        query = query.filter(models.Accessory.category == category)
    if search:
        query = query.filter(models.Accessory.name.ilike(f"%{search}%"))
    return query.all()


@router.get("/{acc_id}", response_model=schemas.AccessoryOut)
def get_accessory(acc_id: int, db: Session = Depends(get_db)):
    acc = db.query(models.Accessory).filter(models.Accessory.id == acc_id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Accessory not found")
    return acc
@router.post("/", response_model=schemas.AccessoryOut)
def create_accessory(acc: schemas.AccessoryCreate, db: Session = Depends(get_db)):
    new_acc = models.Accessory(**acc.dict())
    db.add(new_acc)
    db.commit()
    db.refresh(new_acc)
    return new_acc