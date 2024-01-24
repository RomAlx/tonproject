import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


class Database:
    def __init__(self):
        load_dotenv()
        # Замените следующие значения вашими учетными данными MySQL:
        self.username = os.getenv("DB_USERNAME")
        self.password = os.getenv("DB_PASSWORD")
        self.server = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")
        self.db_name = os.getenv("DB_DATABASE")

        # Пример строки подключения для MySQL
        self.sqlalchemy_database_url = f"mysql+mysqlconnector://{self.username}:{self.password}@{self.server}:{self.port}/{self.db_name}"

        self.engine = create_engine(
            self.sqlalchemy_database_url
        )
        self.sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

        self.base = declarative_base()