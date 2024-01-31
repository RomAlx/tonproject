from sqlalchemy.orm import Session


from backend.models.user import User
from backend.objects.Database import session


class UserRepository:
    @staticmethod
    def create_user(tg_id: int, username: str) -> User:
        user = session.query(User).filter(User.tg_id == tg_id).one_or_none()
        if not user:
            user = User(tg_id=tg_id, username=username)
            session.add(user)
            session.commit()
        return user
