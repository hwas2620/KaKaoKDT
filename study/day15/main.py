##### 파이썬 심화
### 함수
## 필수 매개변수
def greet(name):
    return f"안녕하세요, {name}님!"

# 함수 호출 (name은 필수이므로 반드시 제공해야 함)
print(greet("철수")) # 출력: 안녕하세요, 철수님!
# print(greet()) # 오류 발생: name 매개변수가 필요함

# 기본값 매개변수
def greet_with_time(name, time="아침"):
    return f"{time}에 만나서 반가워요, {name}님!"

# 함수 호출 (time은 기본값이 있으므로 생략 가능)
print(greet_with_time("영희")) # 출력: 아침에 만나서 반가워요, 영희님!
print(greet_with_time("민수", "저녁")) # 출력: 저녁에 만나서 반가워요, 민수님!

## 가변 매개 변수: def sum_all(*arg)
## 복합 매개 변수: def make_pizza(size, *toppings)
## 키워드 매개 변수: def create_profile(name, age, **details)

## 함다 함수
# 일반 함수
def square(x):
    return x ** 2

# 람다 함수
square_lambda = lambda x: x ** 2

print(square(5)) # 출력: 25
(square_lambda (5)) # 출력: 25

# 조건식을 포함하는 람다 함수
get_max = lambda a, b: a if a > b else b
print(get_max(10, 5)) # 출력: 10

# 여러 매개변수를 받는 람다 함수
calc_rectangle_area = lambda width, height: width * height
print(calc_rectangle_area(5, 3)) # 출력: 15

# map과 람다 함수
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares) #출력: [1, 4, 9, 16, 25]

#동일한 기능을 일반 함수로 구현
def square_function(x):
    return x**2

squares_regular = list(map(square_function, numbers))
print(squares_regular) # 출력: [1, 4, 9, 16, 25]

# filter와 람다 함수
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers) # 출력: [2,4]

# 동일한 기능을 일반 함수로 구현
def is_even(x):
    return x % 2 == 0

even_numbers_regular = list(filter(is_even, numbers))
print(even_numbers_regular) # 출력: [2,4]

#reduce와 람다 함수
from functools import reduce

product = reduce (lambda x, y: x * y, numbers)
print(product) # 출력: 120 (1*2*3*4*5)

# 동일한 기능을 일반 함수로 구현
def multiply(x, y):
    return x * y

product_regular = reduce (multiply, numbers)
print(product_regular) # 출력: 120 (1*2*3*4*5)

## 클로저
def power_function(n):
    def power(x):
        return x ** n
    return power

# 제곱 함수 생성
square = power_function(2)
cube = power_function(3)

# 함수 사용
print(square (4)) # 출력: 16 (4의 제곱)
print(cube (3)) # 출력: 27 (3의 세제곱)

def validate_input(func):
    def wrapper(x, y):
        if x < 0 or y < 0:
            raise ValueError("입력값은 0보다 커야 합니다.")
        return func(x, y)
    return wrapper

@validate_input
def divide(x, y):
    if y == 0:
        raise ZeroDivisionError("0으로 나눌 수 없습니다.")
    return x / y

#테스트
try:
    print(divide(10, 2)) # 출력: 5.0
    print(divide(-10, 2)) # ValueError 발생
except ValueError as e:
    print(e) # 출력: 입력값은 0보다 커야 합니다.

# 문제: 다음 리스트에서 홀수만 추출하여 제곱한 결과를 반환하세요.
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print(list(map(lambda x: x**2, filter(lambda x: x % 2 == 1, numbers))))
print([x**2 for x in numbers if x % 2 == 1])

# 문제: 함수 호출 시 매개변수와 반환값을 로그로 출력하는 데코레이터를 작성하세요.
# 그리고 이 데코레이터를 add 함수에 적용하세요.
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"함수 {func.__name__} 호출: 인자 {args}, 키워드 인자 {kwargs}")
        result = func(*args, **kwargs)
        print(f"함수 {func.__name__} 반환값: {result}")

        return result
    
    return wrapper

@log_function_call
def add(a, b):
    return a + b

print(add(3, 5))

# CSV 파일을 읽어 딕셔너리 리스트로 변환하는 함수 작성
# 학생 중 성적이 80점 이상인 학생만 필터링
# 필터링된 학생들의 평균 나이 계산
# 모든 함수 호출 시간을 측정하는 데코레이터 적용

# id    name  age score
# 1     김철수  20  85
# 2     이영희  19  92
# 3     박민수  22  78
# 4     정지원  18  96
# 5     최재민  21  65

print("================")
import csv
import time
from functools import wraps

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} 함수의 실행 시간: {end_time - start_time} 초")
        return result
    return wrapper

@measure_time
def read_csv(file_path):
    data = []
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data

students = read_csv('students.csv')
print(students)
high_score_students = [row for row in students if int(row['score']) >= 80]
print(high_score_students)
age_sum = sum(int(row['age']) for row in high_score_students)
print(age_sum)
avg = age_sum / len(high_score_students)
print(avg)

### 모듈과 패키지
# 모듈 가져오기
import math

## 패키기란?
# 여러 모듈들을 모아놓은 폴더
# from . import main

## PIP: 패키지 설치 및 관리를 위한 표준 도구
# requirements.txt: 의존성 관리 도구

## 가상 환경
# python -m venv myenv

# 과제
# 간단한 계산기 모듈을 만들어 보세요.
# 모듈에는 덧셈, 뺄셈, 곱셈, 나눗셈 함수가 포함

### 클래스와 객체 지향

# 실습: 은행 계좌 클래스 만들
from BankAccount import BankAccount

my_account = BankAccount("홍길동", 1000000)
your_account = BankAccount("김철수")

my_account.get_balance()
my_account.deposit(500000)
my_account.withdraw(200000)
my_account.withdraw(2000000)

my_account.apply_interest()

my_account.print_transaction_history()

### 파일 입출력
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)

