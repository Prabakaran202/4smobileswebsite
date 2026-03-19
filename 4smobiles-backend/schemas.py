from pydantic import BaseModel
from typing import List, Optional


# ── Variant ──
class VariantBase(BaseModel):
    ram: int
    storage: int
    price: int
    stock: bool = True


class VariantCreate(VariantBase):
    pass


class VariantUpdate(BaseModel):
    ram:     Optional[int]  = None
    storage: Optional[int]  = None
    price:   Optional[int]  = None
    stock:   Optional[bool] = None


class VariantOut(VariantBase):
    id: int
    product_id: int

    model_config = {"from_attributes": True}


# ── Product ──
class ProductBase(BaseModel):
    brand:   str
    name:    str
    img_url: Optional[str] = None


class ProductCreate(ProductBase):
    variants: List[VariantCreate]


class ProductUpdate(BaseModel):
    brand:   Optional[str] = None
    name:    Optional[str] = None
    img_url: Optional[str] = None


class ProductOut(ProductBase):
    id:       int
    variants: List[VariantOut] = []

    model_config = {"from_attributes": True}


# ── Auth ──
class AdminLogin(BaseModel):
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type:   str = "bearer"