
print(bool(0))
print(bool(1))
print(bool(-1))
print(bool(""))
print(bool("Hello"))
print(bool([]))
print(bool([1, 2]))
print(bool(None))

# 논리 연산자
x = True
y = False
print(x and y)
print(x or y)
print(not x)

# 단축 평가
print(False and print("확인"))
print(True or print("확인"))
print(0 and 5)
print(2 and 5)
print(0 or 5)
print(2 or 5)

#비교 연산
equal = (5 == 5)
not_equal = (5 != 3)
greater = (5 > 3)
less = (5 < 3)

#복합 비교 연산
x = 10
complex_check = (5 < x < 15)

# 객체 비교
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 == list2)
print(list1 is list2)
print(list1 is list3)

# 정수로 변환
int("123")
int(3.14)
int (True)

# 실수로 변환
float("3.14")
float(5)
float(True)

# 문자열로 변환
str(123)
str(3.14)
str(True)

# 불리언으로 변환
bool(1)
bool(0)
bool("Hello")
bool("")

# Quiz
#문제 1: 다음 코드의 출력 결과는 무엇인가요? => false
a = 0.1 + 0.1 + 0.1
b = 0.3
print(a == b)

#문제 2: 다음 중 False로 평가되지 않는 것은 무엇인가요? => 3
# a) 0
# b) 1111
# c) [0]
# d) None
# e) False

#문제 3: 다음 코드의 실행 결과와 그 이유를 설명하세요. => TypeError: 'str' object does not support item assignment
# text = "Python"
# text[0] = "J"
# print(text)

### 컬렉션 타입 - 리스트 (list)
#1. 대괄호로 생성
fruits = ["사과", "바나나", "체리"]
#2. List() 함수 사용
numbers = list(range (1, 6)) # [1, 2, 3, 4, 5]
#3. 빈 리스트 생성
empty_list1 = []
empty_list2 = list()
#4. 다양한 데이터 타입 혼합
mixed_list = [1, "안녕", 3.14, True, [1, 2, 3]]
#5. 리스트 컴프리헨션(List Comprehension)
squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

# 리스트 접근과 슬라이싱
fruits = ["사과", "바나나", "체리", "딸기", "오렌지"]

print(fruits[0])
print(fruits[2])
print(fruits[-1])
print(fruits[-3])
print(fruits [1:4])
print (fruits[:3])
print (fruits[2:])
print(fruits[::2])
print(fruits[::-1])

# 리스트 수정
fruits = ["사과", "바나나", "체리"]

fruits[1] = "블루베리"
fruits.append("딸기")
fruits.insert(1, "포도")
more_fruits = ["키위", "망고"]
fruits.extend(more_fruits)
fruits.remove("체리")

#특정 위치 요소 제거 및 반환
removed = fruits.pop(2)
print(removed)
print(fruits)

fruits.sort()
fruits.reverse()

print(len(fruits))

fruits.append("사과")
print(fruits.count("사과"))

print(fruits.index("키위"))

fruits.clear()


# enumerate
letters = ['a', 'b', 'c']
enum_obj = enumerate(letters)
print(list(enum_obj)) # [(0, 'a'), (1, 'b'), (2, 'c')]

fruits = ["사과", "바나나", "체리", "딸기"]
for index, fruit in enumerate(fruits):
    print(f"{index}번: {fruit}")

for index, fruit in enumerate (fruits, start=1):
    print(f"{index}번: {fruit}")

colors = ["빨강", "파랑", "초록", "파랑", "노랑"]
blue_indices = [i for i, color in enumerate (colors) if color == "파랑"]
print(f"파랑의 위치: {blue_indices}")

fruits = ["사과", "바나나", "체리"]
for i in range(len(fruits)):
    print(f"{i}번: {fruits[i]}")

# 중첩 리스트
colors = ["빨강", "파랑", "초록", "파랑", "노랑"]
blue_indices = [i for i, color in enumerate (colors) if color == "파랑"]
print(f"파랑의 위치: {blue_indices}")

fruits = ["사과", "바나나", "체리"]
for i in range(len(fruits)):
    print(f"{i}번: {fruits[i]}")

original = [1, 2, [3, 4]]
shallow = original.copy()

shallow [2][0] = 30

print(original)
print(shallow)

import copy
original = [1, 2, [3, 4]]
deep = copy.deepcopy(original)

deep[2][0] = 30

print(original)
print(deep)

row = [0] * 3
bad_matrix = [row] * 3
bad_matrix[0][0] = 1
print(bad_matrix)

good_matrix = [[0 for _ in range(3)] for _ in range(3)]
good_matrix[0][0] = 1
print(good_matrix)

# 1. 다음 코드의 실행 결과는? => [1, 10, 20, 5]
numbers = [1, 2, 3, 4, 5]
numbers[1:4] = [10, 20]
print(numbers)

#2. 다음 코드의 실행 결과는? => [1,2,3,4], [7,8,9]
def modify_list(lst):
    lst.append(4)
    lst = [7, 8, 9]
    return lst

original = [1, 2, 3]
result = modify_list(original)
print(original)
print(result)

#3. 다음 코드를 실행하면 어떤 오류가 발생할까요? => [[1,2,0],[1,2,0],[1,2,0]]
matrix = [[0] * 3] * 3
matrix[0][0] = 1
matrix[1][1] = 2
print(matrix)

### 튜플(tuple)
coordinates = (10, 20)

numbers = tuple ([1, 2, 3, 4, 5])

colors = "red", "green", "blue"

single_item = (42,)
not_tuple = (42)

empty_tuple = ()
empty_tuple2 = tuple()

mixed_tuple = (1, "안녕", 3.14, True, (1, 2, 3))

fruits = ("사과", "바나나", "체리", "딸기", "오렌지")

print(fruits[0])
print (fruits[-1])

print(fruits[1:4])
print (fruits[:3])
print(fruits[::2])

nested = (1, 2, (3, 4, 5))
print(nested [2] [1])

print(len(fruits))

print("바나나" in fruits)

coordinates = (10, 20, 30)

# 아래 코드는 오류 발생
#coordinates[0] = 100
# TypeError: 'tuple' object does not support item assignment

coordinates = (100, 200, 300)

#튜플 메서드와 연산
numbers = (1, 2, 3, 2, 4, 2)

print(numbers.count(2))
print(numbers.index(3))

#튜플 연결
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2

(1, 2, 3, 4, 5, 6)
repeated = tuple1 * 3

print ((1, 2, 3) < (1, 3, 0))

#튜플 언패킹(Unpacking)
rgb = (255, 100, 50)
red, green, blue = rgb
print(f"Red: {red}, Green: {green}, Blue: {blue}")

numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(first)
print(middle)
print(last)

# 함수에서 여러 값 반환 시 튜플 활용
def get_user_info():
    return "홍길동", 30, "서울"

name, age, city = get_user_info()
print(f"{name}은 {age}세이고 {city}에 살고 있습니다.")

#좌표 데이터는 쉽게 변경되면 안 됨
critical_coordinates = (37.5665, 126.9780)

def process_location(coord):
    latitude, longitude = coord
    return result

# 다중 반환 값 처리
def get_dimensions():
    width= 800
    height = 600
    depth = 3
    return width, height, depth

dimensions = get_dimensions()
print(f"튜플: {dimensions}")

w, h, d = get_dimensions()
print(f"너비: {w}, 높이: {h}, 깊이: {d}")

# 네임드 튜플 활용
from collections import namedtuple
Person = namedtuple('Person', ['name', 'age', 'city'])
person1 = Person ('홍길동', 30, '서울')

print(person1[0])
print(person1.name)
print(person1.age)
print(person1.city)

# 튜플의 불변성은 함수형 프로그래밍 스타일에 적합
def add_to_each(data, value):
    return tuple (item + value for item in data)

numbers = (1, 2, 3)
new_numbers = add_to_each (numbers, 10)

print(numbers)
print(new_numbers)

# 다음 코드의 실행 결과는? => (3,4,5)
t1 = (1, 2, 3)
t2 = (4, 5, 6)
result = t1 + t2
print(result[2:5])

# 다음 코드에서 오류가 발생하는 라인은? => TypeError: 'tuple' object does not support item assignment
person = ('홍길동', 30, '서울')
name, age, city = person
age = age + 1
# person[1] = age
print(f"{name}은 {age}세이고 {city}에 살고 있습니다.")

# 다음 코드의 실행 결과는?
def get_values():
    return 1, 2, 3

x, *y = get_values()
print(x)
print(y)

### 딕셔너리
import time

data_size = 1000000
search_key = f"key_{data_size-1}"

dict_data = {f"key_{i}": i for i in range(data_size)}
list_data = [(f"key_{i}", i) for i in range(data_size)]

# 딕셔너리 검색 (0(1)) 시간 측정
start_time = time.time()
result_dict = dict_data[search_key]
dict_time = time.time() -start_time

#리스트 검색 (O(n)) 시간 측정
start_time = time.time()
result_list = None

for k, v in list_data:
    if k == search_key:
        result_list = v
    break
list_time = time.time() - start_time

print(f"딕셔너리 검색 시간 (0(1)): {dict_time:.8f}초")
print(f"리스트 검색 시간 (o(n)): {list_time:.8f}초")
print(f"속도 차이: 리스트가 딕셔너리보다 {list_time/dict_time:.0f}배 느림")

student = {"name": "홍길동", "age": 20, "grade": "A"}

student2 = dict(name="김철수", age=22, grade="B")

items = [("name", "이영희"), ("age", 25), ("grade", "C")]
student3 = dict(items)

empty_dict = {}
empty_dict2 = dict()

keys = ["name", "age", "grade"]
default_student = dict.fromkeys (keys, "미정") # {'name': '미정', 'age': '미정', 'grade': '미정'}

# 딕셔너리 접근과 수정
person = {
    "name": "홍길동",
    "age": 30,
    "city": "서울",
    "skills": ["Python", "Java", "SQL"]
}

print(person["name"])
print(person.get("age"))

print(person.get("email", "이메일 없음"))

person ["age"] = 31

person["email"] = "hong@example.com"

del person["city"]

skill = person.pop("skills")
print(f"제거된 skills: {skill}")

# 딕셔너리 메서드
student = {
    "name": "홍길동",
    "age": 20,
    "courses": ["수학", "영어", "과학"]
}

#keys(): 모든 키 반환
print(list(student.keys()))
#values(): 모든 값 반환
print(list(student.values()))
#items(): 키-값 쌍 반환
print(list(student.items()))

#update(): 딕셔너리 병합/갱신
new_info = {"grade": "A", "age": 21}
student.update(new_info)
print(student)

#clear(): 모든 항목 삭제
temp_dict = {"temp": 1}
temp_dict.clear()
print(temp_dict)

#copy(): 딕셔너리 얕은 복사
student_copy = student.copy()

# 딕셔너리 순회
student = {
    "name": "홍길동",
    "age": 20,
    "grade": "A",
    "courses":    ["수학", "영어", "과학"]
}
#키 순회
print("=== 키 목록 ===")
for key in student:
    # student.keys()와 동일
    print(key)

#값 순회
print("\n=== 값 목록 ===")
for value in student.values():
    print(value)

#키-값 쌍 순회
print("\n=== 키-값 쌍 ===")
for key, value in student.items():
    print(f"{key}: {value}")

#중첩 딕셔너리
users = {
    "user1": {
        "name": "홍길동",
        "age": 30,
        "email": "hong@example.com"
    },
    "user2": {
        "name": "김철수",
        "age": 25,
        "email": "kim@example.com"
    }
}

#중첩 값 접근
print(users["user1"]["name"])

#중첩 딕셔너리 순회
for user_id, user_info in users.items():
    print(f"\n사용자 ID: {user_id}")

for key, value in user_info.items():
    print(f"- {key}: {value}")

# 딕셔너리 컴프리헨션
#1. 기본 형태
squares = {x: x**2 for x in range(1, 6)}
print(squares)

#2. 조건부 딕셔너리 컴프리헨션
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)

#3. 값 변환 예제
fruits = ['apple', 'banana', 'cherry']
fruit_lengths = {fruit: len(fruit) for fruit in fruits}
print(fruit_lengths)

## JSON 예시
# json
# {
#     "name": "홍길동",
#     "age": 30,
#     "is_student": false,
#     "courses": ["Python", "Data Analysis", "Machine Learning"],
#     "address": {
#         "city": "서울",
#         "zipcode": "12345"
#     }
# }
## 동일한 데이터의 파이썬 딕셔너리
#python
person = {
    "name": "홍길동",
    "age": 30,
    "is_student": False,
    #파이썬의 True/False vs. JSON의 true/false
    "courses": ["Python", "Data Analysis", "Machine Learning"],
    "address": {
        "city": "서울",
        "zipcode": "12345"
    }
}

#json 처리
import requests

# 무료 테스트 API에 GET 요청 보내기
response = requests.get('https://jsonplaceholder.typicode.com/posts/1')

# 응답 상태 확인
if response.status_code == 200:

    # JSON 응답을 딕셔너리로 변환
    data = response.json()
    
    # 딕셔너리 데이터 접근
    print(f"게시물 ID: {data['id']}")
    print(f"제목: {data['title']}")
    print(f"내용: {data['body']}")
    print(f"작성자 ID: {data['userId']}")
else:
    print(f"오류 발생: {response.status_code}")

