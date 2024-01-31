from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship

from .base import Base

class Token(Base):
    __tablename__ = 'tokens'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    token = Column(String(255), nullable=False)
    expires = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="token", uselist=False)

    def __repr__(self):
        return f"<Token(id={self.id}, user_id={self.user_id}, token='{self.token}', expires={self.expires})>"
