# my_calculator.py

def add(a, b):
    """두 수를 더한 값을 반환합니다."""
    return a + b

def subtract(a, b):
    """두 수를 뺀 값을 반환합니다."""
    return a - b

def multiply(a, b):
    """두 수를 곱한 값을 반환합니다."""
    return a * b

def divide(a, b):
    """두 수를 나눈 값을 반환합니다. 0으로 나눌 경우 오류 메시지를 반환합니다."""
    if b == 0:
        return "오류: 0으로 나눌 수 없습니다."
    return a / b