{
  const iterable = [1, 2, 3]; // 배열은 기본적으로 이터러블

  // 이터레이터를 얻기 위해 Symbol.iterator 메서드를 호출
  const iterator = iterable[Symbol.iterator]();

  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: 3, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
}
{
  function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
  }

  const generator = generatorFunction();

  console.log(generator.next()); // { value: 1, done: false }
  console.log(generator.next()); // { value: 2, done: false }
  console.log(generator.next()); // { value: 3, done: false }
  console.log(generator.next()); // { value: undefined, done: true }
}
{
  const user = {
    name: 'Alice',
    address: {
        city: 'Wonderland'
    }
  };

  console.log(user?.address?.city); // "Wonderland" 출력
  console.log(user?.contact?.email); // undefined 출력, 오류 발생하지 않음
}
{
  const users = [{ name: 'Alice' }, null, { name: 'Bob' }];

  console.log(users[0]?.name); // "Alice" 출력
  console.log(users[1]?.name); // undefined 출력, 오류 발생하지 않음
  console.log(users[2]?.name); // "Bob" 출력
}
{
  const user = {
    greet: function() {
        return 'Hello!';
    }
  };

  console.log(user.greet?.()); // "Hello!" 출력
  console.log(user.nonExistentMethod?.()); // undefined 출력, 오류 발생하지 않음
}
{
  const result = expression1 ?? expression2;
}
{
  const user = null;

  const name = user?.name ?? 'Anonymous';
  console.log(name); // "Anonymous" 출력
}
{
  const a = 1;
  const b = 1;
  const c = 1;

  function funcA(){
    const b = 2;
    const c = 2;
    
    console.log("2", a, b, c);
    funcB()
  }

  function funcB() {
    const c = 3;
    
    console.log("3", c, b, c);
  }

  console.log("1", a, b, c);
  funcA();
}
{
  function outerFunction() {
    let outerVariable = "I am outside!";

    function innerFunction() {
        console.log(outerVariable); // outerVariable에 접근 가능
    }

    return innerFunction;
  }

  const myClosure = outerFunction();
  myClosure(); // "I am outside!" 출력
}
{
  function createCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
  }

  const counter = createCounter();

  console.log(counter()); // 1 출력
  console.log(counter()); // 2 출력
  console.log(counter()); // 3 출력
}
{
  console.log(this); // 브라우저에서는 window 객체 출력
}
{
  function showThis() {
    console.log(this);
  }

  showThis(); // 전역 객체 (브라우저에서는 window) 출력
}
{
  const obj = {
    name: 'Alice',
    showThis: function() {
        console.log(this.name);
    }
  };

  obj.showThis(); // "Alice" 출력
}
{
  function Person(name) {
    this.name = name;
  }

  const person = new Person('Alice');
  console.log(person.name); // "Alice" 출력
}
{
  class Person {
    constructor(name, age) {
        // this는 새로 생성된 인스턴스 객체를 가리킴
        this.name = name;
        this.age = age;
    }

    // 클래스 메서드
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }

  const alice = new Person('Alice', 30);
  alice.greet(); // "Hello, my name is Alice and I am 30 years old." 출력

  const bob = new Person('Bob', 25);
  bob.greet(); // "Hello, my name is Bob and I am 25 years old." 출력
}
{
  function showThis() {
    console.log(this);
  }

  const obj = {
      name: 'Object',
      showThis: showThis
  };

  showThis(); // 글로벌 객체 (브라우저에서는 window)
  obj.showThis(); // obj 객체
}
{
  function showThis() {
    console.log(this.name);
  }

  const obj1 = { name: 'Object 1' };
  const obj2 = { name: 'Object 2' };

  showThis.call(obj1); // "Object 1" 출력
  showThis.apply(obj2); // "Object 2" 출력

  const boundShowThis = showThis.bind(obj1);
  boundShowThis(); // "Object 1" 출력
}
{
  const obj = {
    name: 'Object',
    showThis: () => {
        console.log(this);
    }
  };

  obj.showThis(); // 글로벌 객체 window (화살표 함수의 this는 상위 스코프의 this를 가리킴)
}
{
  function Outer() {
    this.name = 'Outer';

    this.showThisRegular = function() {
        console.log(this.name);
    };

    this.showThisArrow = () => {
        console.log(this.name);
    };
  }

  const outer = new Outer();
  outer.showThisRegular(); // "Outer" 출력 (this는 outer 객체를 가리킴)
  outer.showThisArrow();   // "Outer" 출력 (this는 정의된 위치의 this를 가리킴)

  const detachedRegular = outer.showThisRegular;
  detachedRegular(); // undefined 또는 전역 객체의 name 속성 (this는 전역 객체를 가리킴)

  const detachedArrow = outer.showThisArrow;
  detachedArrow();   // "Outer" 출력 (this는 여전히 outer 객체를 가리킴)
}
{
  // 생성자 함수 정의
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  // 프로토타입에 메서드 추가
  Person.prototype.greet = function() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };

  // 새로운 객체 생성
  const alice = new Person('Alice', 30);

  // 프로토타입 확인
  console.log(Object.getPrototypeOf(alice) === Person.prototype); // true 출력

  // 프로토타입 체인 확인
  console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true 출력
  console.log(Object.getPrototypeOf(Object.prototype) === null); // true 출력

  // 메서드 호출
  alice.greet(); // "Hello, my name is Alice and I am 30 years old." 출력
}
{
  const obj = {};
  const proto = { greet: function() { console.log('Hello!'); } };

  Object.setPrototypeOf(obj, proto);

  obj.greet(); // "Hello!" 출력
}
{
  // 웹 새로고침 후 진행하세요
function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  // Person의 프로토타입에 메서드 추가
  Person.prototype.greet = function() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };

  const alice = new Person('Alice', 30);
  const bob = new Person('Bob', 25);

  // 두 객체는 Person.prototype에 정의된 메서드를 공유
  alice.greet(); // "Hello, my name is Alice and I am 30 years old." 출력
  bob.greet();   // "Hello, my name is Bob and I am 25 years old." 출력
}
{
  // 웹 새로고침 후 진행하세요
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }

      // 클래스 메서드는 자동으로 Person.prototype에 추가됨
      greet() {
          console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
      }
  }

  const alice = new Person('Alice', 30);
  const bob = new Person('Bob', 25);

  // 두 객체는 Person.prototype에 정의된 메서드를 공유
  alice.greet(); // "Hello, my name is Alice and I am 30 years old." 출력
  bob.greet();   // "Hello, my name is Bob and I am 25 years old." 출력
}
{
  function Animal(type) {
    this.type = type;
  }

  // 프로토타입에 메서드 추가
  Animal.prototype.makeSound = function() {
      console.log(`${this.type} makes a sound.`);
  };

  function Dog(name) {
      Animal.call(this, 'Dog'); // Animal 생성자 호출하여 상속
      this.name = name;
  }

  // 프로토타입 상속 설정
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;

  Dog.prototype.bark = function() {
      console.log(`${this.name} barks!`);
  };

  const rex = new Dog('Rex');

  rex.makeSound(); // "Dog makes a sound." 출력 (Animal의 메서드 상속)
  rex.bark();      // "Rex barks!" 출력 (Dog의 메서드)
}
// 비동기 프로그래핑
{
  setTimeout(function, delay);
}
{
  console.log('Start');

  setTimeout(() => {
      console.log('This message is shown after 2 seconds');
  }, 2000); // 2초 후에 메시지 출력

  console.log('End');
}
{
  console.log('Start');

  setTimeout(() => {
      console.log('Step 1');

      setTimeout(() => {
          console.log('Step 2');

          setTimeout(() => {
              console.log('Step 3');

              setTimeout(() => {
                  console.log('Step 4');
              }, 1000);

          }, 1000);

      }, 1000);

  }, 1000);

  console.log('End');
}
{
  const myPromise = new Promise((resolve, reject) => {
    const success = true; // 비동기 작업의 성공 여부를 결정

    if (success) {
        resolve('The operation was successful!');
    } else {
        reject('The operation failed.');
    }
  });
}
{
  myPromise.then(result => {
    console.log(result); // "The operation was successful!" 출력
  });
  myPromise.catch(error => {
    console.error(error); // "The operation failed." 출력
  });
  myPromise.finally(() => {
    console.log('Promise has been settled (fulfilled or rejected).');
  });
}
{
  function randomOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomValue = Math.random(); // 0과 1 사이의 무작위 숫자 생성

            if (randomValue < 0.3) { // 30% 확률로 실패
                reject('Operation failed.');
            } else { // 70% 확률로 성공
                resolve(`Operation succeeded. value is ${randomValue}`);
            }
        }, 1000); // 1초 후 실행
    });
  }

  function repeatUntilFailure() {
      randomOperation()
          .then(result => {
              console.log(result);
              // 작업이 성공하면 다시 반복
              repeatUntilFailure();
          })
          .catch(error => {
              console.error(error); // 실패 시 오류 메시지 출력
              console.log('Stopping execution.');
          });
  }

  // 반복 실행 시작
  repeatUntilFailure();
}
{
  function taskA() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Task A completed'), 1000);
    });
  }

  function taskB() {
      return new Promise(resolve => {
          setTimeout(() => resolve('Task B completed'), 2000);
      });
  }

  function taskC() {
      return new Promise(resolve => {
          setTimeout(() => resolve('Task C completed'), 3000);
      });
  }

  Promise.all([taskA(), taskB(), taskC()])
      .then(results => {
          console.log('All tasks completed:', results);
      })
      .catch(error => {
          console.error('One of the tasks failed:', error);
      });
}
{
  function taskA() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Task A completed'), 1000);
    });
  }

  function taskB() {
      return new Promise((resolve, reject) => {
          setTimeout(() => reject('Task B failed'), 2000);
      });
  }

  function taskC() {
      return new Promise(resolve => {
          setTimeout(() => resolve('Task C completed'), 3000);
      });
  }

  Promise.allSettled([taskA(), taskB(), taskC()])
      .then(results => {
          console.log('All tasks completed:');
          results.forEach(result => console.log(result.status, result.value || result.reason));
      });
}
{
  function createRandomPromise() {
    return new Promise((resolve, reject) => {
        const randomValue = Math.random();
        const delay = Math.random() * 1000; // 0에서 1000ms 사이의 랜덤 지연

        setTimeout(() => {
            if (randomValue > 0.5) { // 50% 확률로 성공 또는 실패 결정
                resolve('Promise succeeded');
            } else {
                reject('Promise failed');
            }
        }, delay);
    });
  }

  function racePromises() {
      const promise1 = createRandomPromise();
      const promise2 = createRandomPromise();

      Promise.race([promise1, promise2])
          .then(result => {
              console.log('First promise fulfilled:', result);
          })
          .catch(error => {
              console.error('First promise rejected:', error);
          });
  }

  // 필요할 때마다 새롭게 초기화하며 반복 실행
  racePromises();

  racePromises();

  racePromises();
}
{
  async function fetchData() {
    return "Data fetched!";
  }

  fetchData().then(data => console.log(data)); // "Data fetched!" 출력
}
{
  function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data fetched!");
        }, 2000); // 2초 지연 후 데이터 반환
    });
  }

  async function processData() {
      console.log("Fetching data...");
      const data = await fetchData();
      console.log(data); // "Data fetched!" 출력
  }

  processData();
}
{
  async function fetchDataWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Error fetching data!");
        }, 2000);
    });
  }

  async function processData() {
      try {
          const data = await fetchDataWithError();
          console.log(data);
      } catch (error) {
          console.error(error); // "Error fetching data!" 출력
      }
  }

  processData();
}