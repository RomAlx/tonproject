from sqlalchemy.orm import Session

from backend.models import User
from backend.models import Balance
from backend.objects.Database import session


class UserRepository:
    @staticmethod
    def create_user(tg_id: int, username: str) -> User:
        user = session.query(User).filter(User.tg_id == tg_id).one_or_none()
        if not user:
            user = User(tg_id=tg_id, username=username)
            session.add(user)
            session.commit()
            balance = Balance(user_id=user.id, balance=0)
            session.add(balance)
            session.commit()
        return user

    @staticmethod
    def update_user(user: User) -> User:
        session.commit()
        return user

    @staticmethod
    def get_user(user_id: int) -> User:
        user = session.query(User).filter(User.id == user_id).one_or_none()
        return user

    @staticmethod
    def get_user_with_tg_id(tg_id: int) -> User:
        user = session.query(User).filter(User.tg_id == tg_id).one_or_none()
        return user

    @staticmethod
    def get_user_with_np_id(np_id: int) -> User:
        user = session.query(User).filter(User.np_id == np_id).one_or_none()
        return user

    @staticmethod
    def get_user_balance(user: User) -> Balance:
        balance = user.balance
        return balance

    @staticmethod
    def update_users_balance(user: User, balance_amount: float) -> Balance:
        balance = user.balance
        balance.balance = balance_amount
        session.add(balance)
        session.commit()
        return balance
