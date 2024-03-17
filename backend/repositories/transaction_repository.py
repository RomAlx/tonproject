from sqlalchemy.orm import Session
from sqlalchemy import desc
from sqlalchemy import and_, or_
from sqlalchemy.exc import SQLAlchemyError

from backend.models import User
from backend.models import Balance
from backend.models import Transaction
from backend.objects.Database import session


class TransactionRepository:
    @staticmethod
    def create_transaction(data: dict) -> Transaction:
        try:
            if data['type'] == 'deposit':
                return TransactionRepository().create_payment(payment=data)
            if data['type'] == 'withdraw':
                return TransactionRepository().create_withdraw(withdraw=data)
            if data['type'] == 'transfer_to':
                return TransactionRepository().create_transfer_to(transfer_to=data)
        except SQLAlchemyError as e:
            session.rollback()

    @staticmethod
    def get_transaction_by_id(transaction_id: int) -> Transaction:
        try:
            transaction = session.query(Transaction).filter(Transaction.id == transaction_id).one_or_none()
            return transaction
        except SQLAlchemyError as e:
            session.rollback()

    @staticmethod
    def create_payment(payment: dict) -> Transaction:
        user = session.query(User).filter(User.np_id == payment['np_id']).one_or_none()
        transaction = session.query(Transaction).filter(Transaction.payment_id == payment['payment_id']).one_or_none()
        if not transaction:
            transaction = Transaction(
                user=user,
                amount=payment['amount'],
                type=payment['type'],
                payment_id=payment['payment_id'],
                symbol=payment['symbol'],
                payment_status=payment['payment_status'],
            )
            session.add(transaction)
            session.commit()
        return transaction

    @staticmethod
    def create_transfer_to(transfer_to: dict) -> Transaction:
        user = session.query(User).filter(User.np_id == transfer_to['np_id']).one_or_none()
        transaction = session.query(Transaction).filter(
            Transaction.payment_id == transfer_to['payment_id']).one_or_none()
        if not transaction:
            transaction = Transaction(
                user=user,
                amount=transfer_to['amount'],
                type=transfer_to['type'],
                payment_id=transfer_to['payment_id'],
                symbol=transfer_to['symbol'],
                payment_status=transfer_to['payment_status'],
            )
            session.add(transaction)
            session.commit()
        return transaction

    @staticmethod
    def create_withdraw(withdraw: dict) -> Transaction:
        user = session.query(User).filter(User.id == withdraw['user_id']).one_or_none()
        transaction = session.query(Transaction).filter(Transaction.payment_id == withdraw['payment_id']).one_or_none()
        if not transaction:
            transaction = Transaction(
                user=user,
                amount=withdraw['amount'],
                type=withdraw['type'],
                payment_id=withdraw['payment_id'],
                symbol=withdraw['symbol'],
                payment_status=withdraw['payment_status'],
            )
            session.add(transaction)
            session.commit()
        return transaction

    @staticmethod
    def update_payment(payment: dict) -> Transaction:
        try:
            transaction = session.query(Transaction).filter(Transaction.payment_id == payment['payment_id']).one_or_none()
            if transaction:
                transaction.payment_status = payment['payment_status']
                session.add(transaction)
                session.commit()
            return transaction
        except SQLAlchemyError as e:
            session.rollback()

    @staticmethod
    def update_payout(payout: dict) -> Transaction:
        try:
            transaction = session.query(Transaction).filter(Transaction.payment_id == payout['id']).one_or_none()
            if transaction:
                transaction.payment_status = payout['status']
                session.add(transaction)
                session.commit()
            return transaction
        except SQLAlchemyError as e:
            session.rollback()

    @staticmethod
    def update_transaction(transaction: Transaction) -> Transaction:
        try:
            session.add(transaction)
            session.commit()
            return transaction
        except SQLAlchemyError as e:
            session.rollback()

    @staticmethod
    def get_transaction_by_user_id(user_id: int, page: int = 1, per_page: int = 10) -> Transaction:
        try:
            transactions_query = session.query(Transaction) \
                .filter(
                and_(
                    or_(Transaction.type == "deposit", Transaction.type == "withdraw"),
                    Transaction.payment_status != 'expired'
                ),
                Transaction.user_id == user_id
            ) \
                .order_by(Transaction.updated_at.desc())
            transactions_page = transactions_query.limit(per_page).offset((page - 1) * per_page).all()
            return transactions_page
        except SQLAlchemyError as e:
            session.rollback()
