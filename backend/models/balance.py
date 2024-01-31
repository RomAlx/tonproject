from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float
from sqlalchemy.orm import relationship

from .base import Base


class Balance(Base):
    __tablename__ = 'balances'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    balance = Column(Float, nullable=False)

    user = relationship("User", back_populates="balance", uselist=False)

    def __repr__(self):
        return f"<Balance(id={self.id}, user_id={self.user_id}, balance={self.balance})>"
