### 파일 입출력
# 바이너리 파일 읽기
# with open('image.jpg', 'rb') as file:
#     binary_data = file.read()
#     print(binary_data)

# XOR 암호화를 이용한 파일 암/복호화
def xor_encrypt_decrypt(input_file, output_file, key):
    """
    XOR 연산을 사용해 파일을 암호화하거나 복합니다.
    XOR 암호하는 같은 키로 두 번 수령하면 원래 데이터로 돌아오는 특성이 있습니다.
    """
    try:
        with open(input_file, 'rb') as infile:
            data = infile.read()
            key_bytes = key.encode() if isinstance(key, str) else bytes([key])
            key_len = len(key_bytes)
            encrypted_data = bytearray(len(data))
        
            for i in range(len(data)):
                encrypted_data[i]= data[i] ^ key_bytes[i % key_len]
            with open(output_file, "wb") as outfile:
                outfile.write(encrypted_data)

        print(f"파일 처리 관료: {input_file} -> {output_file}")

        return True
    except Exception as e:
        print(f"오류 발생: {e}")
        
        return False
    
# 암호화
xor_encrypt_decrypt('example.txt', 'secret.enc', 'mykey123')

# 복호화 (같은 키를 사용)
xor_encrypt_decrypt('secret.enc', 'decrypted.txt', 'mykey123')

import base64

# 바이너리 데이터
binary_data = b'Hello, binary world!'

# Base64로 인코딩 (바이너리 -> 문자열)
encoded = base64.b64encode(binary_data)
print(f"Base64 인코딩: {encoded}") # b'SGVsbG8sIGJpbmFyeSB3b3JsZCE='
print(f"문자열로 변환: {encoded.decode('ascii')}")

#Base64에서 디코딩 (문자열 -> 바이너리)
decoded = base64.b64decode(encoded)
print(f"원본 바이너리 데이터: {decoded}") # b'Hello, binary world!'

## 경로 관련 함수
import os

# 현재 작업 디렉토리 확인
current_dir = os.getcwd()
print(f"현재 디렉토리: {current_dir}")

# 경로 결합
data_dir = os.path.join(current_dir, 'data')
file_path = os.path.join(data_dir, 'example.txt')
print(f"파일 경로: {file_path}")

# 경로 분리
dir_name = os.path.dirname(file_path) # 디렉토리 경로
file_name = os.path.basename(file_path) # 파일 이름
print(f"디렉토리: {dir_name}")
print(f"파일 이름: {file_name}")

### 예외 처리
try:
    print("파일을 처리합니다.")
    file = open("data.txt", "r")
    content = file.read()
    value = int(content)
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
except ValueError:
    print("파일 내용을 숫자로 변환할 수 없습니다.")
else:
    print(f"파일에서 읽은 숫자: {value}")
    result = 100 / value
    print(f"100을 이 숫자로 나눈 결과: {result}")
finally:
    print("파일 처리가 완료되었습니다.")
    if 'file' in locals():
       file.close()

## 사용자 정의 예제
class InsufficientFundsError(Exception):
    """계좌에 잔액이 부족할 때 발생하는 예외"""

    def __init__(self, balance, amount, message=None):
        self.balance = balance
        self.amount = amount
        self.message = message or f"잔액 부족: 현재 잔액 (balance)원, 요청 금액 {amount}원"
        super().__init__(self.message)

    def get_deficit(self):
        """부족한 금액 계산"""
        return self.amount - self.balance

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("입금 금액은 양수여야 합니다.")
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if amount <= 8:
            raise ValueError("출금 금액은 양수여야 합니다.")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance
    
#예외 처리 예시
account = BankAccount("홍길동", 10000)

try:
    account.withdraw(15000)
except InsufficientFundsError as e:
    print(e) #"잔액 부족: 현재 잔액 10000원, 요청 금액 15000원"
    deficit = e.get_deficit()
    print(f"부족한 금액: {deficit}원") # "부족한 금액: 5000원"

### 로깅
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(levelname)s - %(message)s',
    filename='app.log',
    encoding='utf-8'
)

def process_data(data):
    logging.debug("데이터 처리 시작: (data)")

    try:
        # 데이터 검증
        if not isinstance(data, dict):
            logging.warning(f"딕셔너리가 아닌 데이터 수신: {type(data)}")
            data = { "value": data }
        # 데이터 처리
        result = data.get("value", a) * 2
        logging.info(f"데이터 처리 결과: {result}")

        return result
    except Exception as e:
        logging.error(f"데이터 처리 중 오류 발생: (e)", exc_info=True)
        raise
# 사용 예
try:
    print(process_data({ "value": 10 }))
    print(process_data(5))
    print(process_data(None))
except Exception as e:
    print("오류 처리: (e}")

### 함수형 프로그래밍
## 핵심 개념
# 일급 함수
# 순수 함수
# 불변성
# 고차 함수
## 도구
# 람다 함수
# map
# filter
# reduce
## 고급 기법
# 클로저
# 커링
# 함수 합성
# 부분 적용
## 이벤트 처리

### 이터레이터와 제네레이터
# 이터레이션
# 이터러블
# 이터레이터