### 집합
fruits = {"사과", "바나나", "체리"}

numbers = set([1, 2, 3, 2, 1])

chars = set("hello")

empty_set = set()
not_set = {}

squares = {x**2 for x in range(1, 6)}

# 기본 집합 생성
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

print(A | B)
print(A.union (B))

print(A & B)
print(A.intersection (B))

# 대칭 차집합 (Symmetric Difference): A 또는 B에 있지만 양쪽에 모두 있지는 않은 요소
print(A^ B) # {1, 2, 3, 6, 7, 8}
print(A.symmetric_difference (B))

# 위와 동일
# 부분집합 확인 (Subset)
C = {1, 2}
print(C.issubset(A)) # True (C는 A의 부분집합)
print(C <= A) # 위와 동일
# 진부분집합 확인 (Proper Subset)

print(C < A) # True (C는 A의 진부분집합)

# 상위집합 확인 (Superset)
print(A.issuperset(C))

# True (A는 C의 상위집합)
print(A >= C) # 위와 동일

# 진상위집합 확인 (Proper Superset)
print(A > C) # True (A는 c의 진상위집합)

# 서로소 확인 (Disjoint)
D = {10, 11, 12}
print(A.isdisjoint(D))
# True (A와 D는 공통 요소가 없음)

# 기본 집합
fruits = {"사과", "바나나", "체리"}

#요소 추가
fruits.add("딸기") # {"사과", "바나나", "체리", "딸기"}

# 여러 요소 추가
fruits.update(["망고", "블루베리"]) #
{"사과", "바나나", "체리", "딸기", "망고", "블루베리"}

#요소 제거 (존재하지 않으면 오류 발생)
fruits.remove("바나나")

#요소 제거 (존재하지 않아도 오류 없음)
fruits.discard ("키위") # 없어도 오류 없음

#임의의 요소 제거 및 반환
popped = fruits.pop() # 집합에서 임의의 요소 제거 및 반환
print(f"제거된 요소: {popped}")

# 모든 요소 제거
fruits.clear() #빈 집합 {}

#집합 순회
#숫자 집합
numbers = {10, 20, 30, 40, 50}

#기본 순회 (순서 보장되지 않음)
print("집합 요소:")
for num in numbers:
    print(num)

#정렬된 순회가 필요하면 정렬 필요
print("\n정렬된 집합 요소:")
for num in sorted (numbers):
    print(num)

#집합 내포 사용
squared = {x**2 for x in numbers}
print("\n제곱값 집합:", squared)

#두반 학생들의 취미 분석
class_a_hobbies = {"축구", "농구", "독서", "게임", "요리"}
class_b_hobbies = {"야구", "농구", "독서", "그림", "요리", "음악"}

# 양쪽 반에 모두 있는 취미 (교집합)
common_hobbies = class_a_hobbies & class_b_hobbies
print(f"공통 취미: {common_hobbies}")

# A반에만 있는 취미 (차집합)
only_a_hobbies = class_a_hobbies - class_b_hobbies
print(f"A반 전용 취미: {only_a_hobbies}")

#B반에만 있는 취미 (차집합)
only_b_hobbies = class_b_hobbies - class_a_hobbies
print(f"B반 전용 취미: {only_b_hobbies}")

# 모든 취미 목록 (합집합)
all_hobbies = class_a_hobbies | class_b_hobbies
print(f"모든 취미 목록: {all_hobbies}")

#고유한 취미(대칭 차집합)
unique_hobbies = class_a_hobbies ^ class_b_hobbies
print(f"한쪽 반에만 있는 취미: {unique_hobbies}")

#취미의 종류 수
print(f"전체 취미 종류 수: {len(all_hobbies)}")

numbers = [1, 2, 3, 2, 1, 4, 5, 4, 3, 2]

#방법 1: 집합 변환 후 다시 리스트로 변환
unique_numbers = list(set(numbers))
print(f"중복 제거된 숫자: {unique_numbers}")

#순서 보장 안 됨
#방법 2: 순서 유지하며 중복 제거
def remove_duplicates (items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result
    unique_ordered = remove_duplicates (numbers)
    print(f"순서 유지하며 중복 제거: {unique_ordered}")

#다음 코드의 결과는? => T, T, F, {1,2,6,7}
set1 = {1, 2, 3, 4, 5}
set2 = {3, 4, 5, 6, 7}
set3 = {1, 2}

print(set3.issubset(set1))
print(set3 < set1)
print(set1.isdisjoint(set2))
print(set1 ^ set2)

#다음 코드의 결과는? => {1,2,(3,4),5}
def process_data(data):
    unique = set()
    result = []
    for item in data:
        if isinstance (item, list):
            item = tuple(item)
        if item not in unique:
            unique.add(item)
            result.append(item)
    return result

data = [1, 2, 2, [3, 4], [3, 4], 5]
print(process_data(data))

### 연산자
a = 10
b = 3

#덧셈 연산자(+)
print(f"덧셈: {a} + {b} = {a + b}") # 결과: 13

# 뺄셈 연산자(-)
print(f"뺄셈: {a} - {b} = {a - b}") # 결과: 7

#곱셈 연산자(*)
print(f"곱셈: {a} * {b} = {a * b}") # 결과: 30

#나눗셈 연산자(/) 실수 결과 반환 -
print(f"나눗셈: {a} / {b} = {a / b}") #결과: 3.3333...

#정수 나눗셈 연산자(//) - 몫만 반환
print(f"정수 나눗셈: {a} // {b} = {a // b}") # 결과: 3

# 나머지 연산자(%)
print(f"나머지: {a} % {b} = {a % b}") # 결과: 1

# 거듭제곱 연산자(**)
print(f"거듭제곱: {a} ** {b} = {a ** b}") # 결과: 1000

#문자열과 덧셈 연산자
str1 = "Hello"
str2 = "World"
print(f"문자열 연결: {str1} + {str2} = {str1 + str2}") # 결과: HelloWorld

# 문자열과 곱셈 연산자
print(f"문자열 반복: {str1} * 3 = {str1 * 3}") # 결과: HeLLoHeLLoHello

#비교 연산자 예시
x = 10
y = 5
z = 10

# 동등 비교 연산자(==)
print(f"{x} == {y} = {x == y}") # 결과: False
print(f"{x} == {z} = {x == z}") #결과: True

#부등 비교 연산자(!=)
print(f"{x} != {y} = {x != y}") #2 결과: True

#크다(>)
print(f"{x} > {y} = {x > y}") #결과: True

# 작다(<)
print(f"{x} < {y} = {x < y}") #결과: False

#크거나 같다(>=)
print(f"{x} >= {z} = {x >= z}") # 결과: True

#작거나 같다(<=)
print(f"{x} <= {y} = {x <= y}") #결과: False

#문자열 비교 (알파벳 순서로 비교)
str1 = "apple"
str2 = "banana"
print(f"'{str1}' < '{str2}' = {str1 < str2}") # 결과: True (a가 6보다 알파벳 순서상 앞에 있음)

# 다른 타입 비교
print(f"3 == '3' = {3 == '3'}") # 결과: False (타입이 다름)
print(f"3 == int('3') = {3 == int('3')}") # 결과: True (타입 변환 후 비교)

##멤버십 연산자
# 리스트에서의 활용
fruits = ["사과", "바나나", "체리", "오렌지"]
print(f"'바나나' in fruits: {'바나나' in fruits}") #결과: True
print(f"'수박' in fruits: {'수박' in fruits}") #결과: False
print(f"'수박' not in fruits: {'수박' not in fruits}") # 결과: True

# 문자열에서의 활용 (부분 문자열 검색)
message = "Hello, World!"
print(f"'World' in message: {'World' in message}") # 결과: True
print (f"'Python' in message: {'Python' in message}") # 결과: False

# 튜플에서의 활용
numbers = (1, 2, 3, 4, 5)
print(f"3 in numbers: {3 in numbers}") #결과: True
print(f"6 not in numbers: {6 not in numbers}") #결과: True

# 집합에서의 활용 (매우 빠른 검색 - 0(1) 시간 복잡도)
colors = {"빨강", "파랑", "녹색"}
print(f"'파랑' in colors: {'파랑' in colors}") #결과: True
print(f"'노랑' in colors: {'노랑' in colors}") #결과: False

# 딕셔너리에서의 활용 (키 검색)
user = {"name": "홍길동", "age": 30, "email": "hong@example.com"}
print(f"'name' in user: {'name' in user}") #결과: True (키 존재)
print(f"'address' in user: {'address' in user}") #결과: False (키 없음)
print(f"'홍길동' in user: {'홍길동' in user}") #결과: False (값은 검색 안됨)
print(f"'홍길동' in user.values(): {'홍길동' in user.values()}") #결 과: True (값 검색)

#for 루프와 함께 사용
for fruit in fruits:
    if fruit in ["사과", "오렌지"]:
        print(f"{fruit}는 과일 주스로 적합합니다.")
        
# 조건문과 함께 사용
user_input = "체리"
if user_input in fruits:
    print(f"{user_input}는 과일 목록에 있습니다.")
else:
    print(f"{user_input}는 과일 목록에 없습니다.")

# 여러 컬렉션의 교차 확인
requested_toppings = ["버섯", "치즈", "피망"]
available_toppings = ["치즈", "올리브", "피망", "페퍼로니", "버섯"]

for topping in requested_toppings:
    if topping in available_toppings:
        print(f"{topping} 추가")
    else:
        print(f"{topping}은(는) 재고가 없습니다.")

## 논리 연산자
# and, or, ^ 

## 복합 할당 연산자
# +=, -= 등

#문제 1: 다음 코드의 출력 결과는 무엇인가요? => 4
x = 10
y = 5
z = x // y * 2 + x % y
print(z)

#문제 2: 다음 논리 연산의 결과값은 무엇인가요? => T
a = True
b = False
c = True
result = a or b and not c
print(result)

#문제 3: 다음 코드를 실행한 후 변수 x의 최종값은 무엇인가요? => 5
x = 5
x += 3
x *= 2
x //= 3
print(x)

### 조건문
## if, elif, else
## 3항 연산자
x = -10
abs_value = x if x >= 0 else -x

#문제 1: 다음 코드의 출력 결과는 무엇인가요? => 8000
age = 15
if age < 13:
    ticket_price = 5000
    category = "어린이"
elif age < 19:
    ticket_price = 8000
    category = "청소년"
else:
    ticket_price = 10000
    category = "성인"
print(f" (category] 티켓 가격: {ticket_price}원")

#문제 2: 다음 코드에서 발생하는 문제는 무엇이며, 어떻게 수정해야 할까요? = D
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"학점: {grade}")

# 문제 3: 다음 중첩 조건문을 3항 연산자를 사용하여 한 줄로 작성하세요.
temperature = 25
if temperature > 30:
    message = "더운 날씨입니다."
else:
    if temperature > 20:
        message = "적당한 날씨입니다."
    else:
        message = "추운 날씨입니다."
print(message)

# =>
message = "더운 날씨입니다." if temperature > 30 else "적당한 날씨입니다." if temperature > 20 else "추운 날씨입니다."
print(message)

### 반복문
## for
for i in range(5):
    print('*' * (i + 1))

# enumerate() 활용 예시
fruits = ["사과", "바나나", "딸기"]

#인덱스와 값 함께 접근
for index, fruit in enumerate (fruits):
    print(f"{index+1} 번째 과일: {fruit}")

#시작 인덱스 변경
for index, fruit in enumerate (fruits, start=1):
    print(f"{index} 번째 과일: {fruit}")

## while
count = 0
while count < 5:
    print(count)
    count += 1

# break, continue

# 다음 반복문의 출력 결과는? =>
for i in range(1, 5):
    for j in range(1, i+1):
        print(j, end="")
    print()

# =>
# 1
# 12
# 123
# 1234

# 다음 반복문의 출력 결과는? => 16
sum_value = 0
for i in range(1, 10):
    if i % 2 == 0:
        continue
    sum_value += i
    if sum_value > 10:
        break
print(sum_value)

# 다음 반복문의 출력 결과는? => 9
numbers = [4, 2, 7, 1, 8, 3, 6]
result = 0
for num in numbers:
    if num % 2 == 0:
        result += num
    else:
        result = num
print(result)

