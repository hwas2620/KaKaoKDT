## 이터레이터
#1부터 n까지 카운트하는 이터레이터
class Counter:
    def __init__(self, Low, high):
        self.current = Low    # 현재 값
        self.high = high        #최대 값

    def __iter__(self):
        return self    # 자신을 이터레이터로 반환
    
    def __next__(self):
        if self.current > self.high:
            raise StopIteration          # 요소가 더 이상 없음
        else:
            self.current += 1            # 다음 값으로 이동
            return self.current -1       # 현재 값 반환

# 사용 예시
counter = Counter(1, 5)
print(next(counter))
print(next(counter))

# 제너레이터
#큰 범위의 값 생성 시 메모리 비교
import sys

#리스트 컴프리헨션 (모든 값을 메모리에 저장)
big_list = [i for i in range(10000)]
print(f"리스트 크기: {sys.getsizeof(big_list)} 바이트")

# 제너레이터 표현식 (값을 필요할 때 생성)
big_gen = (i for i in range(10000))
print(f"제너레이터 크기: {sys.getsizeof(big_gen)} 바이트")

# 리스트 컴프리헨션 vs 제너레이터 표현식
squares_list = [x**2 for x in range(10)]    # 리스트 컴프리헨션
squares_gen = (x**2 for x in range(10))     # 제너레이터 표현식

print(squares_list) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(squares_gen)  # <generator object <genexpr> at 0x...>

# 제너레이터 표현식은 필요할 때만 값 계산
for num in squares_gen:
    print(num) # 0, 1, 4, 9, 16, 25, 36, 49, 64, 81 출력

# 제너레이터 함수의 상태 관리 예시
def stateful_generator():
    print("첫 번째 값 생성")
    yield 1

    print("두 번째 값 생성")
    yield 2

    print("세 번째 값 생성")
    yield 3

gen = stateful_generator()
print(next(gen))    #첫번째 값 생성, 1 출력
print("중간 작업 수행")
print(next(gen))    #두번째 값 생성, 2 출력
print(next(gen))    #세 번째 값 생성, 3 출력

# 제너레이터 함수에서 return 사용
def gen_with_return():
    yield 1
    yield 2
    return "제너레이터 종료" # StopIteration 예외와 함께 반환값 전달
    yield 3 #이 부분은 실행되지 않음

# 사용 예시
g = gen_with_return()
print(next(g))  #1
print(next(g))  #2

try:
    print(next(g))
except StopIteration as e:
    print(f"반환값: {e.value}")    # 반환값: 제너레이터 종료

#yield from 예시
def nested_generator():
    yield 'A'
    yield '8'
    yield 'C'

def main_generator():
    yield 1
    yield from nested_generator()   # nested_generator의 모든 값을 생성
    yield 2

# 사용 예시
for item in main_generator():
    print(item) #1, A, B, C, 2 출력

# 실시간 데이터 스트리밍 시뮬레이션
import time
import random

def sensor_data_stream():
    """센서 데이터를 시뮬레이션하는 제너레이터"""
    while True:
        # 센서에서 데이터를 읽어오는 것처럼 시뮬레이션
        temperature = 20 + random.uniform(-5,5)
        yield f"온도: {temperature:.2f}°C, 시간: {time.strftime('%H:%M:%S')}"
        time.sleep(0.01) #1초 대기

# 사용 예시 (5개 샘플만 출력)
stream = sensor_data_stream()
for _ in range(5):
    print(next(stream))

# 동시성과 병렬 처리
import threading
import time

def background_task():
    while True:
        print("백그라운드 작업 실행 중...")
        time.sleep(1)

# 데몬 스레드 생성
daemon_thread = threading.Thread (target=background_task, daemon=True)
daemon_thread.start()

# 메인 스레드는 3초 후 종료
print("메인 스레드 작업 중...")
time.sleep(3)
print("메인 스레드 종료")
#마지막 print 출력 후 메인 스레드 종료
# 데몬 스레드도 함께 종료됨

# 스레드 동기화 도구
import threading
import time

# 이벤트 객체 생성
event = threading.Event()

def waiter():
    print("대기자: 이벤트를 기다리는 중...")
    event.wait()    # 이벤트가 설정될 때까지 대기
    print("대기자: 이벤트를 수신하고 작업 진행!")

def setter():
    print("설정자: 작업 중...")
    time.sleep(3)    # 일부 작업 시뮬레이션
    print("설정자: 이제 이벤트를 설정합니다.")
    event.set()      # 이벤트 설정

# 스레드 시작
t1 = threading.Thread(target=waiter)
t2 = threading.Thread (target=setter)

t1.start()
t2.start()

import threading
import time

# 데이터와 Condition 객체
data = None
condition = threading.Condition()

# 데이터를 기다리는 스레드
def wait_for_data():
    print("대기 스레드: 데이터를 기다립니다...")

    with condition:        # Lock 획득
        condition.wait()        # 데이터가 준비될 때까지 기다림
        # 알림을 받으면 다시 Lock을 획득하고 계속 실행
        print(f"대기 스레드: 데이터 '{data}'를 받았습니다!")

# 데이터를 준비하는 스레드
def prepare_data():
    global data

    print("준비 스레드: 데이터 준비 중...")
    time.sleep(2) # 데이터 준비 시간

    with condition:    # Lock 획득
        data = "준비된 데이터"
        print("준비 스레드: 데이터가 준비되었습니다!")
        condition.notify()  # 대기 중인 스레드에 알림
        
# 스레드 생성 및 시작
t1= threading.Thread(target=wait_for_data)
t2= threading.Thread (target=prepare_data)

t1.start()
t2.start()

t1.join()
t2.join()

import threading
import time

# 공유 변수
counter = 0

def increment(count):
    global counter
    for _ in range(count):
        current = counter
        # 스레드 전환이 일어날 수 있는 시간
        time.sleep(0.001)
        counter = current + 1

# 두 개의 스레드 생성
t1 = threading.Thread(target=increment, args=(1000,))
t2 = threading.Thread (target=increment, args=(1000,))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"최종 카운터 값: {counter}") # 2000이 아닐 가능성이 높음

import threading
import time

counter = 0
counter_lock = threading. Lock() # 락객체 생성

def increment_with_lock(count):
    global counter

    for _ in range(count):
        counter_lock.acquire()    # 락 획득
        try:
            current = counter
            time.sleep(0.001)
            counter = current + 1
        finally:
            counter_lock.release() # 락 해제

# 두 개의 스레드 생성
t1= threading.Thread (target=increment_with_lock, args=(1000,))
t2 = threading.Thread (target=increment_with_lock, args=(1000,))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"락 사용 후 최종 카운터 값: {counter}") # 항상 2000

import threading
import time

counter = 0
counter_lock = threading.Lock()

def increment_with_lock_context(count):
    global counter
    for _ in range(count):
        with counter_lock: #자동으로 락 획득 및 해제
            current = counter
            time.sleep(0.001)
            counter = current + 1

# 두 개의 스레드 생성
t1 = threading.Thread(target=increment_with_lock_context, args=(1000,))
t2 = threading.Thread (target=increment_with_lock_context, args=(1000,))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"with문 사용 후 최종 카운터 값: {counter}") # 항상 2000

import threading
import queue
import time
import random

#작업 큐 생성
task_queue = queue.Queue()
# 결과 큐 생성
result_queue = queue.Queue()

#작업 생성 함수
def create_tasks():
    print("작업 생성 시작")
    # 10개의 작업 생성
    for i in range(10):
        task = f"작업-{i}"
        task_queue.put(task)      #작업 보관함에 넣음
        print(f"작업 추가: {task}")
        time.sleep(random.uniform(0.1, 0.3)) # 약간의 간격을 두고 작업 생성

    # 영업 종료 신호 (워커 수만큼)
    for _ in range(3): # 요리사가 3명이니 종료 신호도 3개
        task_queue.put(None) # None은 "오늘 장사 끝" 신호

    print("모든 작업 생성 완료")

#작업 처리 함수
def worker (worker_id):
    print(f"워커 {worker_id} 시작")    # 출근 신고
    while True: # 계속 일하는 무한 루프
        #작업 가져오기 (주문서 확인)
        task = task_queue.get() #보관함에서 작업 꺼냄

        #퇴근 시간인지 확인
        if task is None: # "오늘 장사 끝" 신호 확인
            print(f"워커 (worker_id] 종료") # 퇴근!
            break #무한 루프 종료

        #작업 처리(요리 만들기)
        print(f"워커 {worker_id}가 {task} 처리 중...")
        processing_time = random.uniform (0.5, 1.5) # 요리 시간은 랜덤
        time.sleep(processing_time) # 요리하는 시간
        
        # 결과 제출(완성된 요리 올려두기)
        result = f"{task} 완료 (소요시간: {processing_time:.2f}초)"
        result_queue.put((worker_id, result))    # 결과 보관함에 넣음

        #작업 완료 표시 (주문서에 완료 도장)
        task_queue.task_done() # 현재 처리 중인 특정 작업 하나가 완료, 전체 작업이 끝났다는 의미는 아님
        print(f"남은 작업 수: {task_queue.qsize()}")

#결과 수집 함수
def result_collector():
    print("결과 수집기 시작") # 서빙 직원 출근
    results = [] # 완료된 주문 기록용

    #총 10개 결과 수집 (10개 요리 서빙)
    for _ in range(10):
        worker_id, result = result_queue.get() # 완성된 요리 가져오기
        print(f"결과 수신: 워커 (worker_id) -> (result)")
        results.append(result) #결과 기록
        result_queue.task_done() # "이 요리 서빙했어요" 표시

    print(f"총 {len(results)}개 결과 수집 완료") # 서빙 완료

# 스레드 생성 및 시작
creator = threading.Thread(target=create_tasks)
workers = [threading.Thread(target=worker, args=(i,)) for i in range(3)]
collector = threading.Thread(target=result_collector)

#스레드 시작
creator.start()
for w in workers:
    w.start()
collector.start()

# 스레드 종료 대기
creator.join()
for w in workers:
    w.join()
collector.join()

print("모든 작업 완료!") # 오늘 영업 끝!

import concurrent.futures
import time
import random

# 실행할 작업 할수
def task (name):
    print(f"작업 (name) 시작")
    delay = random.uniform(0.5, 2)
    time.sleep(delay) # 작업 시간 시뮬레이션
    print(f"작업 {name} 완료 (소요시간: {delay:.2f}초)")
    return f"{name} 결과"

import concurrent.futures
import time

def task(params):
    name, duration = params
    print(f"작업 {name} 시작")
    time.sleep(duration)
    return f"{name} 완료 (소요시간: {duration}초)"

#작업 파라미터 목록 준비
params = [
("A", 2),
("B", 1),
("C", 3),
("D", 1.5)
]

#map을 사용한 병렬 처리
with concurrent.futures.ThreadPoolExecutor (max_workers=2) as executor:# 최대 2개의 스레드 사용
    #map은 제출 순서대로 결과 반환
    results = list(executor.map(task, params))

    # 모든 결과 출력
    for result in results:
        print(result)

import concurrent.futures
import random
import time

def fetch_data(url):
    print(f"(url) 데이터 요청 중...")
    # 데이터 요청 시간 시뮬레이션
    time.sleep(random.uniform(0.5, 2))
    #가끔 오류 발생 시뮬레이션
    if random.random() < 0.2:
        raise Exception(f"{url} 연결 오류")
    # 성공 시 데이터 반환
    return f"{url}의 데이터 (크기: {random.randint(100, 1000)}KB)"

# 요청할 URL 목록
urls = [
"https://api.example.com/users",
"https://api.example.com/products",
"https://api.example.com/orders",
"https://api.example.com/settings"
]

# 스레드 풀을 사용한 병렬 데이터 요청
with concurrent.futures. ThreadPoolExecutor (max_workers=3) as executor:
    #각 URL에 대한 Future 객체 저장
    future_to_url = {executor.submit(fetch_data, url): url for url in urls}

    # 완료된 순서대로 결과 처리
    for future in concurrent.futures.as_completed (future_to_url):
        url = future_to_url [future]
        try:
            data = future.result()
            print(f"성공: {url} -> {data}")
        except Exception as e:
            print(f"실패: {url} -> {e}")

## 프로세스
import multiprocessing
import time

def count_up (name, max_count):
    """숫자를 세는 간단한 함수"""
    for i in range(1, max_count + 1):
        print(f"프로세스 {name}: 카운트 {i}")
        time.sleep(0.5)

if __name__ == "_main__": #중요: 항상 이 조건 필요
    #프로세스 생성
    p1 = multiprocessing. Process (target=count_up, args=("A", 5))
    p2 = multiprocessing. Process (target=count_up, args=("B", 3))

    #프로세스 시작
    p1.start()
    p2.start()

    #메인 프로세스에서 다른 프로세스 종료 대기
    p1.join()
    p2.join()

    print("모든 프로세스 종료!")

# Lock
# Queue
# Pool

# 비동기 프로그래밍
import asyncio

#코루틴 정의
async def say_hello (name, delay):
    print(f"{name} 인사 시작")
    await asyncio.sleep(delay) # 비동기적으로 대기 (블로킹하지 않음)
    print(f"{name} 인사 완료 (대기 시간: {delay}초)")
    return f"{name}의 결과"

#메인 코루틴
async def main():
    print("프로그램 시작")

    # 여러 코루틴 동시 실행
    results = await asyncio.gather(
        say_hello("A", 3),
        say_hello("B", 1),
        say_hello("C", 2)
    )
    print(f"모든 결과: {results}")
    print("프로그램 종료")

#이벤트 루프 생성 및 실행
if __name__ == "__main__":
    asyncio.run(main())

