from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Product(Base):
    __tablename__ = "products"

    id       = Column(Integer, primary_key=True, index=True)
    brand    = Column(String(50), nullable=False)
    name     = Column(String(200), nullable=False)
    img_url  = Column(String(500), nullable=True)
    created  = Column(DateTime, server_default=func.now())

    variants = relationship("Variant", back_populates="product", cascade="all, delete")


class Variant(Base):
    __tablename__ = "variants"

    id         = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    ram        = Column(Integer, nullable=False)   # GB
    storage    = Column(Integer, nullable=False)   # GB
    price      = Column(Integer, nullable=False)   # INR
    stock      = Column(Boolean, default=True)

    product = relationship("Product", back_populates="variants")