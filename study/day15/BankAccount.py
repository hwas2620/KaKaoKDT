# 실습: 은행 계좌 클래스 만들기
class BankAccount:
    interest_rate = 0.01

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transaction_history = []
        self._log_transaction("계좌 개설", balance)

    def deposit(self, amount):
        """ 입금 처리 """
        if amount <= 0:
            print("입금 금액은 0보다 커야 합니다.")
            return False
        
        self.balance += amount
        self._log_transaction("입금", amount)
        print(f"{amount}원이 입금되었습니다. 현재 잔액: {self.balance:,}원")
        
        return True
    
    def withdraw(self, amount):
        """ 출금 처리 """

        if amount <= 0:
            print("출금 금액은 0보다 커야 합니다.")
            return False
        
        if amount > self.balance:
            print("잔액 부족. 현재 잔액: {self.balance:,}원")
            return False
        
        self.balance -= amount
        self._log_transaction("출금", amount)
        print(f"{amount}원이 출금되었습니다. 현재 잔액: {self.balance:,}원")
        return True
    
    def get_balance(self):
        """ 현재 잔액 조회 """
        print(f"{self.owner}님의 계좌 잔액: {self.balance:,}원")

        return self.balance
    
    def apply_interest(self):
        """ 이자 적용 """
        interest = self.balance * BankAccount.interest_rate
        self.balance += interest
        self._log_transaction("이자", interest)
        print(f"이자 {interest:,}원이 추가되었습니다. 현재 잔액: {self.balance:,}원")

    def _log_transaction(self, transaction_type, amount):
        """ 거래 내역 기록 (내부 메서드) """
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.transaction_history.append({
            "type": transaction_type,
            "amount": amount,
            "timestamp": timestamp,
            "balance": self.balance
        })

    def print_transaction_history(self):
        """ 거래 내역 출력 """
        print(f"{self.owner}님의 거래 내역:")
        print("-" * 60)
        print(f"{'일시':<25} {'종류':<15} {'금액':<45} {'잔액':<15}")
        print("-" * 60)

        for transaction in self.transaction_history:
            print(f"{transaction['timestamp']:<25} "
                  f"{transaction['type']:<15} "
                  f"{transaction['amount']:,}원".ljust(45) +
                  f"{transaction['balance']:,}원".rjust(15))
        print("-" * 60)
