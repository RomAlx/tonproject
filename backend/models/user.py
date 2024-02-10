from sqlalchemy import Column, Integer, String, BigInteger
from sqlalchemy.orm import relationship

from backend.objects.Database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    tg_id = Column(BigInteger, nullable=False)
    np_id = Column(BigInteger, nullable=True)
    username = Column(String(100))

    balance = relationship("Balance", back_populates="user", uselist=False)
    transactions = relationship("Transaction", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, tg_id={self.tg_id}, username='{self.username}')>"
