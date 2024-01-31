from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float
from sqlalchemy.orm import relationship

from backend.objects.Database import Base


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    wallet_id = Column(Integer, ForeignKey('wallets.id'), nullable=False)
    type = Column(String(10), nullable=False)
    amount = Column(Float, nullable=False)
    symbol = Column(String(10), nullable=False)
    event_id = Column(String(255), nullable=False)
    status = Column(String(255), nullable=False)
    sender = Column(String(255), nullable=False)
    recipient = Column(String(255), nullable=False)

    wallet = relationship("Wallet", back_populates="transaction", uselist=False)

    def __repr__(self):
        return f"<Token(id={self.id}, user_id={self.user_id}, wallet_address={self.wallet_address})>"
