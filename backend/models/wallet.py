from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float
from sqlalchemy.orm import relationship

from backend.objects.Database import Base


class Wallet(Base):
    __tablename__ = 'wallets'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    wallet_address = Column(String(255), nullable=False)
    wallet_address_for_user = Column(String(255), nullable=False)

    user = relationship("User", back_populates="wallet", uselist=False)
    transaction = relationship("Transaction", back_populates="wallet")

    def __repr__(self):
        return f"<Token(id={self.id}, user_id={self.user_id}, wallet_address={self.wallet_address})>"
