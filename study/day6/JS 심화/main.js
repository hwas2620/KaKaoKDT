// 부모 클래스: Animal
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name}이(가) 소리를 냅니다.`);
    }
}

// 자식 클래스: Dog (Animal 클래스를 상속받음)
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 부모 클래스의 생성자를 호출하여 name을 설정
        this.breed = breed;
    }

    // 부모 클래스의 메서드를 재정의 (오버라이딩)
    speak() {
        console.log(`${this.name} (품종: ${this.breed})이(가) 멍멍 소리를 냅니다.`);
    }
}

// 자식 클래스: Cat (Animal 클래스를 상속받음)
class Cat extends Animal {
    // 부모 클래스의 메서드를 재정의 (오버라이딩)
    speak() {
        console.log(`${this.name}이(가) 야옹 소리를 냅니다.`);
    }
}

// 자식 클래스: Bird (Animal 클래스를 상속받음)
class Bird extends Animal {
    // 부모 클래스의 메서드를 재정의 (오버라이딩)
    speak() {
        console.log(`${this.name}이(가) 짹짹 소리를 냅니다.`);
    }
}

// Animal 클래스의 인스턴스 생성
const initAnimal = new Animal('강아지');
initAnimal.speak();

// Animal 클래스를 상속받은 Dog, Cat, Bird 클래스의 인스턴스 생성
const myDog = new Dog('바둑이', '진돗개');
const myCat = new Cat('나비');
const myBird = new Bird('참새');

// 각각의 speak 메서드 호출
myDog.speak(); // "바둑이 (품종: 진돗개)이(가) 멍멍 소리를 냅니다." 출력
myCat.speak(); // "나비이(가) 야옹 소리를 냅니다." 출력
myBird.speak(); // "참새이(가) 짹짹 소리를 냅니다." 출력

// 자식 클래스: GuardDog (Dog 클래스를 상속받음)
class GuardDog extends Dog {
    constructor(name, breed, trainingLevel) {
        super(name, breed); // Dog 클래스의 생성자를 호출하여 name과 breed를 설정
        this.trainingLevel = trainingLevel; // GuardDog만의 고유 속성
    }

    // 부모 클래스의 메서드를 재정의 (오버라이딩)
    speak() {
        console.log(`${this.name} (품종: ${this.breed}, 훈련 레벨: ${this.trainingLevel})이(가) 경계 소리를 냅니다.`);
    }

    // GuardDog만의 새로운 메서드
    guard() {
        console.log(`${this.name}이(가) 경계를 섭니다!`);
    }
}

// GuardDog 클래스의 인스턴스 생성
const myGuardDog = new GuardDog('백구', '시베리안 허스키', '고급');

// GuardDog의 메서드 호출
myGuardDog.speak(); // "백구 (품종: 시베리안 허스키, 훈련 레벨: 고급)이(가) 경계 소리를 냅니다." 출력
myGuardDog.guard(); // "백구이(가) 경계를 섭니다!" 출력

let inventory = {
    quantity: 10,  // 실제 개수

    // Getter: 개수를 그대로 반환
    get totalQuantity() {
        return this.quantity;
    },

    // Setter: 개수를 설정 (음수가 되지 않도록 처리)
    set totalQuantity(value) {
        if (value < 0) {
            console.log("개수는 음수가 될 수 없습니다.");
        } else {
            this.quantity = value;
        }
    }
};

// Getter 사용
console.log(inventory.totalQuantity); // 10 출력

// Setter 사용
inventory.totalQuantity = 15;
console.log(inventory.totalQuantity); // 15 출력

// 잘못된 개수 설정 시도
inventory.totalQuantity = -5; // "개수는 음수가 될 수 없습니다." 출력
console.log(inventory.totalQuantity); // 15 출력 (변경되지 않음)

class Inventory {
    constructor(quantity) {
        this.quantity = quantity;  // 실제 개수
    }

    // Getter: 개수를 그대로 반환
    get totalQuantity() {
        return this.quantity;
    }

    // Setter: 개수를 설정 (음수가 되지 않도록 처리)
    set totalQuantity(value) {
        if (value < 0) {
            console.log("개수는 음수가 될 수 없습니다.");
        } else {
            this.quantity = value;
        }
    }
}

inventory = new Inventory(10);

// Getter 사용
console.log(inventory.totalQuantity); // 10 출력

// Setter 사용
inventory.totalQuantity = 15;
console.log(inventory.totalQuantity); // 15 출력

// 잘못된 개수 설정 시도
inventory.totalQuantity = -5; // "개수는 음수가 될 수 없습니다." 출력
console.log(inventory.totalQuantity); // 15 출력 (변경되지 않음)

class Student {
    // private 필드 정의
    #studentName = '';
    #studentID = 0;

    constructor(studentName, studentID) {
        this.#studentName = studentName;
        this.#studentID = studentID;
    }

    // Getter: studentName을 읽을 때 호출
    get name() {
        return this.#studentName;
    }

    // Setter: studentName을 설정할 때 호출
    set name(newName) {
        this.#studentName = newName;
    }

    // Getter: studentID를 읽을 때 호출
    get id() {
        return this.#studentID;
    }

    // Setter: studentID를 설정할 때 호출
    set id(newID) {
        this.#studentID = newID;
    }

    // private 필드에 접근하여 출력하는 메서드
    displayInfo() {
        console.log(`학생 이름: ${this.name}, 학번: ${this.id}`);
    }
}

// Student 클래스의 인스턴스 생성
const student1 = new Student('이영희', 2023001);

// Getter를 통해 private 필드에 접근
console.log(student1.name); // "이영희" 출력

// Setter를 통해 private 필드의 값을 변경
student1.name = '김철수';
console.log(student1.name); // "김철수" 출력

// Getter와 Setter를 통해 학번 변경 및 접근
console.log(student1.id); // 2023001 출력
student1.id = 2023002;
console.log(student1.id); // 2023002 출력

// 클래스 내부의 메서드를 통해 private 필드를 출력
student1.displayInfo(); // "학생 이름: 김철수, 학번: 2023002" 출력

const person = {};

// 데이터 프로퍼티 'name'을 정의
Object.defineProperty(person, 'name', {
    value: 'Alice',
    writable: false, // 값이 수정 불가능하게 설정
    enumerable: true, // 열거 가능하게 설정
    configurable: false // 프로퍼티 삭제 또는 속성 변경 불가능하게 설정
});

console.log(person.name); // "Alice" 출력

person.name = 'Bob'; // writable: false 이므로 값이 수정되지 않음
console.log(person.name); // 여전히 "Alice" 출력

for (let key in person) {
    console.log(key); // 'name'이 출력됨 (enumerable: true)
}

// 'name' 프로퍼티 삭제 시도 (configurable: false 이므로 삭제되지 않음)
delete person.name;
console.log(person.name); // 여전히 "Alice" 출력

const product = {
    _price: 100, // 실제 가격을 저장하는 내부 변수
    // 접근자 프로퍼티 'price' 정의
    get price() {
        return `$${this._price}`; // 가격을 문자열로 반환
    },
    set price(value) {
        if (value > 0) {
            this._price = value; // 값이 0보다 큰 경우에만 가격 설정
        } else {
            console.log('가격은 0보다 커야 합니다.');
        }
    }
};

console.log(product.price); // "$100" 출력

product.price = 150;
console.log(product.price); // "$150" 출력

product.price = -50; // 유효하지 않은 값이므로 setter에서 경고 메시지 출력
console.log(product.price); // "$150" 출력 (값이 변경되지 않음)

// 배열의 복사
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // arr1의 요소를 복사하여 arr2에 할당
console.log(arr2); // [1, 2, 3] 출력

// 배열의 결합
const arr3 = [4, 5, 6];
const combinedArray = [...arr1, ...arr3]; // arr1과 arr3을 결합
console.log(combinedArray); // [1, 2, 3, 4, 5, 6] 출력

// 함수 호출에서의 사용
function sum(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6 출력 (numbers 배열의 요소가 각각 a, b, c로 전달됨)

// 객체의 복사
const obj1 = { name: "Alice", age: 25 };
const obj2 = { ...obj1 }; // obj1의 속성을 복사하여 obj2에 할당
console.log(obj2); // { name: "Alice", age: 25 } 출력

// 객체의 병합
const obj3 = { job: "Developer" };
const combinedObj = { ...obj1, ...obj3 }; // obj1과 obj3을 병합
console.log(combinedObj); // { name: "Alice", age: 25, job: "Developer" } 출력

// 객체의 속성 덮어쓰기
const obj4 = { name: "Bob", age: 30 };
const updatedObj = { ...obj1, ...obj4 }; // obj1의 속성들이 obj4의 속성들로 덮어써짐
console.log(updatedObj); // { name: "Bob", age: 30 } 출력

{
  // 기본 배열 디스트럭쳐링
  const numbers = [1, 2, 3];
  const [first, second, third] = numbers;
  console.log(first); // 1 출력
  console.log(second); // 2 출력
  console.log(third); // 3 출력

  // 일부 요소만 디스트럭쳐링할 수 있습니다.
  const [one, , three] = numbers; // 두 번째 요소는 무시
  console.log(one); // 1 출력
  console.log(three); // 3 출력

  // 기본값 설정
  const [a, b, c = 10, d = 20] = [1, 2];
  console.log(a); // 1 출력
  console.log(b); // 2 출력
  console.log(c); // 10 출력 (기본값 사용)
  console.log(d); // 20 출력 (기본값 사용)
}
{
  // 기본 객체 디스트럭쳐링
  const person = {
      name: "Alice",
      age: 25,
      job: "Developer"
  };

  const { name, age, job } = person;
  console.log(name); // "Alice" 출력
  console.log(age); // 25 출력
  console.log(job); // "Developer" 출력

  // 다른 이름으로 변수 할당
  const { name: personName, age: personAge } = person;
  console.log(personName); // "Alice" 출력
  console.log(personAge); // 25 출력

  // 기본값 설정
  const { name: n, age: a, hobby = "Reading" } = person;
  console.log(n); // "Alice" 출력
  console.log(a); // 25 출력
  console.log(hobby); // "Reading" 출력 (기본값 사용)
}
{
  // 함수의 매개변수에서 객체 디스트럭쳐링 사용
  function printPerson({ name, age }) {
      console.log(`이름: ${name}, 나이: ${age}`);
  }

  const user = { name: "Bob", age: 30 };
  printPerson(user); // "이름: Bob, 나이: 30" 출력
}
{
  // 기본 자료형
  let number = 273;
  let string = '안녕하세요'
  let boolean = true

  // 자료형을 출력
  console.log(typeof number);
  console.log(typeof string);
  console.log(typeof boolean);
}
{
  // 기본 자료형
  let number = new Number(273);
  let string = new String('안녕하세요');
  let boolean = new Boolean(true);

  // 자료형을 출력
  console.log(typeof number);
  console.log(typeof string);
  console.log(typeof boolean);
}
{
  // 기본 자료형
  let stringA = '음료|1800원';
  console.log(stringA.split('|'));

  // 객체 자료형
  let stringB = new String('음료|1800원');
  console.log(stringB.split('|'));

  // 변수 생성
  let primitiveNumber = 123;

  // 메서드 추가
  primitiveNumber.method = function() {
    return 'Primitive Method';
  }

  // 메서드 실행시 메서드를 추가하지 못하므로 에러가 발생합니다.
  console.log(primitiveNumber.method());
}
{
  // 변수 생성
  let primitiveNumber = 456;

  // 메서드 추가
  Number.prototype.method = function() {
    return 'Primitive Method';
  }

  // 메서드 실행
  console.log(primitiveNumber.method());
}

// 주요 표준 내장 객체
{
  let numberFromLiteral = 123;
  let numberFromConstructor = new Number(123);
}
{
  let stringFromLiteral = '안녕하세요';
  let stringFromConstructor = new String('안녕하세요');
}
{
  // 메서드 체이닝 - 기존 호출
  let string = 'Hello World';

  string = string.toLowerCase(); // 대문자를 소문자로 변경
  string = string.replace(' ', '|'); // 첫 번째 인자를 두 번째 인자로 변경
  let array = string.split('|'); // '|' 기반으로 문자열을 분해

  console.log(string);
  console.log(array);
}
{
  // 메서드 체이닝 - 체이닝
  let string = 'Hello World';

  let array = string.toLowerCase().replace(' ', '|').split('|');

  console.log(string);
  console.log(array);
}
{
  let now = new Date();
  let specificDate1 = new Date('2023-12-25');
  let specificDate2 = new Date(2023, 11, 25);
  let dateFromTimestamp = new Date(1609459200000);
}
{
  // 0 이상 1 미만의 랜덤한 소수 생성
  let randomNumber = Math.random();
  console.log("랜덤한 소수:", randomNumber);

  // 1부터 100까지의 랜덤한 정수 생성
  let randomInt = Math.floor(Math.random() * 100) + 1;
  console.log("1부터 100까지의 랜덤한 정수:", randomInt);
}
{
  let num = 7.6;

  let rounded = Math.round(num);
  console.log("반올림:", rounded); // 8

  let ceiled = Math.ceil(num);
  console.log("올림:", ceiled); // 8

  let floored = Math.floor(num);
  console.log("내림:", floored); // 7
}
{
  let fruits = ["Apple", "Banana", "Cherry"];
  let numbers = new Array(10); // 길이가 10인 빈 배열 생성
  let moreFruits = new Array("Apple", "Banana", "Cherry"); // 배열 생성과 동시에 초기화
  let emptyArray = [];
}
{
  let fruits = ["Apple", "Banana"];

  // 1. push() 메서드: 배열의 끝에 새로운 요소 추가
  fruits.push("Cherry");
  console.log(fruits); // ["Apple", "Banana", "Cherry"]

  // 여러 요소를 한 번에 추가
  fruits.push("Date", "Elderberry");
  console.log(fruits); // ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

  // 2. pop() 메서드: 배열의 마지막 요소를 제거하고 반환
  let lastFruit = fruits.pop();
  console.log(lastFruit); // "Elderberry"
  console.log(fruits); // ["Apple", "Banana", "Cherry", "Date"]

  // 3. splice() 메서드
  // 특정 위치에 요소 추가 (index 1에 두 개의 요소 추가)
  fruits.splice(1, 0, "Fig", "Grape");
  console.log(fruits); // ["Apple", "Fig", "Grape", "Banana", "Cherry", "Date"]

  // 특정 위치에서 요소 제거 (index 2부터 2개의 요소 제거)
  let removedFruits = fruits.splice(2, 2);
  console.log(removedFruits); // ["Grape", "Banana"]
  console.log(fruits); // ["Apple", "Fig", "Cherry", "Date"]

  // 특정 위치에서 요소 교체 (index 1부터 1개의 요소를 "Honeydew"로 교체)
  fruits.splice(1, 1, "Honeydew");
  console.log(fruits); // ["Apple", "Honeydew", "Cherry", "Date"]
}
{
  let fruits = ["Apple", "Banana", "Cherry", "Date"];

  // 1. 배열에 특정 요소가 포함되어 있는지 확인
  let hasBanana = fruits.includes("Banana");
  console.log(hasBanana); // true

  // 2. 배열에 특정 요소가 포함되어 있지 않은 경우
  let hasGrape = fruits.includes("Grape");
  console.log(hasGrape); // false

  // 3. fromIndex를 사용하여 특정 위치부터 검색
  let hasCherryAfterIndex2 = fruits.includes("Cherry", 2);
  console.log(hasCherryAfterIndex2); // true

  let hasAppleAfterIndex2 = fruits.includes("Apple", 2);
  console.log(hasAppleAfterIndex2); // false
}
{
  let fruits = ["Banana", "Apple", "Cherry", "Date"];

  // 1. sort(): 배열을 사전순으로 정렬
  fruits.sort();
  console.log("Sorted:", fruits); // ["Apple", "Banana", "Cherry", "Date"]

  // 2. reverse(): 배열의 요소 순서를 역순으로 바꿈
  fruits.reverse();
  console.log("Reversed:", fruits); // ["Date", "Cherry", "Banana", "Apple"]

  // 3. join(): 배열의 모든 요소를 연결해 하나의 문자열로 만듦
  let fruitString = fruits.join(", ");
  console.log("Joined:", fruitString); // "Date, Cherry, Banana, Apple"

  // 4. concat(): 배열과 다른 배열 또는 값을 결합하여 새로운 배열을 만듦
  let moreFruits = ["Elderberry", "Fig"];
  let allFruits = fruits.concat(moreFruits);
  console.log("Concatenated:", allFruits); // ["Date", "Cherry", "Banana", "Apple", "Elderberry", "Fig"]

  // 5. slice(): 배열의 일부를 선택하여 새로운 배열을 반환
  let slicedFruits = allFruits.slice(1, 4);
  console.log("Sliced:", slicedFruits); // ["Cherry", "Banana", "Apple"]
}
{
  let numbers = [1, 2, 3, 4, 5];

  // 1. forEach(): 각 요소에 대해 함수 실행 (각 요소를 두 배로 출력)
  console.log("Using forEach:");
  numbers.forEach(function(num) {
      console.log(num * 2); // 2, 4, 6, 8, 10 출력
  });

  // 2. map(): 각 요소에 대해 함수 실행한 결과로 새로운 배열 생성 (각 요소를 두 배로 만든 새로운 배열)
  let doubledNumbers = numbers.map(function(num) {
      return num * 2;
  });
  console.log("Using map:", doubledNumbers); // [2, 4, 6, 8, 10]

  // 3. filter(): 각 요소에 대해 함수 실행하여 true를 반환하는 요소로 새로운 배열 생성 (짝수만 필터링)
  let evenNumbers = numbers.filter(function(num) {
      return num % 2 === 0;
  });
  console.log("Using filter:", evenNumbers); // [2, 4]
}
{
  let obj = {
    key1: "value1",
    key2: "value2"
  };
}
{
  let obj = new Object();
  obj.key1 = "value1";
  obj.key2 = "value2";
}
{
  let proto = {greet: function() { console.log("Hello!"); }};
  let obj = Object.create(proto);
  obj.name = "John";
}
// Object.assign()
// Object.assign()은 하나 이상의 소스 객체로부터 타겟 객체로 속성을 복사합니다.
{
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };

  const returnedTarget = Object.assign(target, source);

  console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
  console.log(target); // { a: 1, b: 4, c: 5 }
  Object.keys(), Object.values(), Object.entries()
}
// keys(): 객체의 모든 키를 배열로 반환합니다.
// values(): 객체의 모든 값을 배열로 반환합니다.
// entries(): 객체의 키-값 쌍을 배열의 배열로 반환합니다.
{
  const person = {
    name: "Alice",
    age: 25,
    occupation: "Engineer"
  };

  // 1. Object.keys(): 객체의 모든 키를 배열로 반환
  const keys = Object.keys(person);
  console.log("Keys:", keys); 
  // 출력: Keys: ["name", "age", "occupation"]

  // 2. Object.values(): 객체의 모든 값을 배열로 반환
  const values = Object.values(person);
  console.log("Values:", values); 
  // 출력: Values: ["Alice", 25, "Engineer"]

  // 3. Object.entries(): 객체의 키-값 쌍을 배열의 배열로 반환
  const entries = Object.entries(person);
  console.log("Entries:", entries); 
  // 출력: Entries: [["name", "Alice"], ["age", 25], ["occupation", "Engineer"]]
}
// Object.preventExtensions()
// Object.preventExtensions()는 객체가 더 이상 확장되지 않도록 합니다. 즉, 새로운 속성을 추가할 수 없게 만듭니다.
{
  const person = {
    name: "Alice",
    age: 25
  };

  Object.preventExtensions(person);

  person.occupation = "Engineer"; // 새로운 속성 추가 시도
  console.log(person.occupation); // undefined

  console.log(Object.isExtensible(person)); // false
}
// Object.isSealed()
// Object.isSealed()는 객체가 봉인(sealed)되어 있는지 확인합니다. 봉인된 객체는 새로운 속성을 추가하거나, 기존 속성을 제거할 수 없습니다.
{
  const person = {
    name: "Alice",
    age: 25
  };

  Object.seal(person);

  console.log(Object.isSealed(person)); // true

  person.age = 26; // 기존 속성 변경 가능
  console.log(person.age); // 26

  delete person.name; // 속성 삭제 시도
  console.log(person.name); // "Alice"
}
// Object.freeze()
// Object.freeze()는 객체를 동결(freeze)하여 더 이상 수정할 수 없게 만듭니다. 동결된 객체는 속성 추가, 제거, 수정이 모두 불가능합니다.
{
  const person = {
    name: "Alice",
    age: 25
  };

  Object.freeze(person);

  person.age = 26; // 기존 속성 변경 시도
  console.log(person.age); // 25

  delete person.name; // 속성 삭제 시도
  console.log(person.name); // "Alice"

  person.occupation = "Engineer"; // 새로운 속성 추가 시도
  console.log(person.occupation); // undefined

  console.log(Object.isFrozen(person)); // true
}
{
  const person = {
    name: "Alice",
    age: 25,
    job: "Developer"
  };

  // 자바스크립트 객체를 JSON 문자열로 변환
  const jsonString = JSON.stringify(person);

  console.log(jsonString);
  // 출력: {"name":"Alice","age":25,"job":"Developer"}}
}
{
  const jsonString = '{"name":"Alice","age":25,"job":"Developer"}';

  // JSON 문자열을 자바스크립트 객체로 변환
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject);
  // 출력: {name: "Alice", age: 25, job: "Developer"}
  console.log(jsonObject.name); // "Alice" 출력
}
{
  const sym1 = Symbol();
  const sym2 = Symbol('description'); // 설명을 가진 Symbol 생성
  const sym3 = Symbol('description'); // 같은 설명을 가진 Symbol이라도 서로 다름

  console.log(sym1 === sym2); // false 출력 (모든 Symbol은 고유함)
  console.log(sym2 === sym3); // false 출력 (같은 설명이더라도 서로 다름)

  const sym = Symbol('uniqueKey');

  const obj = {
      [sym]: 'value'
  };

  console.log(obj[sym]); // "value" 출력

  for (let key in obj) {
    console.log(key); // 출력되지 않음 (Symbol 프로퍼티는 열거되지 않음)
  }

  console.log(Object.keys(obj)); // 빈 배열 출력 (Symbol 키는 Object.keys로 접근 불가)
}
{
  const sym = Symbol('mySymbol');
  const obj = {
      [sym]: 'value'
  };

  console.log(obj[sym]); // "value" 출력
}
{
  const sym1 = Symbol('symbol1');
  const sym2 = Symbol('symbol2');
  const obj = {
      [sym1]: 'value1',
      [sym2]: 'value2'
  };

  const symbols = Object.getOwnPropertySymbols(obj);
  console.log(symbols); // [Symbol(symbol1), Symbol(symbol2)]

  console.log(obj[symbols[0]]); // "value1" 출력
  console.log(obj[symbols[1]]); // "value2" 출력
}
{
  const sym = Symbol('symbolKey');
  const obj = {
      [sym]: 'value',
      normalKey: 'normalValue'
  };

  const keys = Reflect.ownKeys(obj);
  console.log(keys); // ["normalKey", Symbol(symbolKey)]

  console.log(obj[keys[0]]); // "normalValue" 출력
  console.log(obj[keys[1]]); // "value" 출력
}
{
  const mySet = new Set();

  mySet.add(1);
  mySet.add(2);
  mySet.add(2); // 중복된 값은 무시됨
  mySet.add(3);

  console.log(mySet.size); // 3 출력

  console.log(mySet.has(2)); // true 출력
  mySet.delete(2);
  console.log(mySet.has(2)); // false 출력

  for (let value of mySet) {
      console.log(value); // 1, 3 출력
  }
}
{
  const myMap = new Map();

  const keyObj = {};
  const keyFunc = function() {};
  const keyString = 'a string';

  myMap.set(keyString, "value associated with 'a string'");
  myMap.set(keyObj, "value associated with keyObj");
  myMap.set(keyFunc, "value associated with keyFunc");

  console.log(myMap.get(keyString)); // "value associated with 'a string'" 출력
  console.log(myMap.get(keyObj)); // "value associated with keyObj" 출력
  console.log(myMap.get(keyFunc)); // "value associated with keyFunc" 출력

  console.log(myMap.size); // 3 출력

  for (let [key, value] of myMap) {
      console.log(key, value);
      // "a string" "value associated with 'a string'"
      // {} "value associated with keyObj"
      // [Function: keyFunc] "value associated with keyFunc"
  }
}
