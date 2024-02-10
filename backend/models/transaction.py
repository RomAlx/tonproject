from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float, BigInteger
from sqlalchemy.orm import relationship

from backend.objects.Database import Base


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    type = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    symbol = Column(String(10), nullable=False)
    payment_id = Column(BigInteger, nullable=False)
    payment_status = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="transactions")

    def __repr__(self):
        return (f"<Transaction(id={self.id}, user_id={self.user_id}, type={self.type}, "
                f"amount={self.amount}, symbol={self.symbol}, payment_id={self.payment_id}, "
                f"payment_status={self.payment_status}, created_at={self.created_at}, "
                f"updated_at={self.updated_at})>")
