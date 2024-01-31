from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from .base import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    tg_id = Column(Integer, nullable=False)
    username = Column(String(100))

    token = relationship("Token", back_populates="user", uselist=False)
    balance = relationship("Balance", back_populates="user", uselist=False)
    wallet = relationship("Wallet", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, tg_id={self.tg_id}, username='{self.username}')>"
