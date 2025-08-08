function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not allowed"); // 강제로 예외를 발생시킴
    }
    let result = a / b;
    console.log(`Result: ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

divide(10, 2); // 정상적인 출력: Result: 5
divide(10, 0); // 오류 발생: Error: Division by zero is not allowed

function varTest() {
    var functionScopedVar = "이것은 함수 스코프 변수입니다.";

    if (true) {
        var functionScopedVar = "이것은 함수 스코프에서 재할당된 변수입니다.";
        console.log(functionScopedVar); // "이것은 함수 스코프에서 재할당된 변수입니다." 출력
    }

    console.log(functionScopedVar); // "이것은 함수 스코프에서 재할당된 변수입니다." 출력
}

varTest();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementsByClassName("header")[0];
  const nav = document.getElementsByClassName("navigation")[0];
  const nav_ul = document.getElementsByTagName("ul")[0]
  const first_btn = document.getElementsByClassName("btn")[0];

  let newAttribute = document.createAttribute("style");
  newAttribute.value = "color:black";
  header.setAttributeNode(newAttribute);

  let newList = document.createElement("li");
  let newContent = document.createTextNode("새로운 메뉴");

  newList.appendChild(newContent);
  nav_ul.appendChild(newList);

  first_btn.addEventListener("click", () => {
    alert("버튼이 클릭되었습니다.");
  });
})


function getAverage() {
  let result = 0;

  for (const num of arguments) {
    result += num;
  }

  console.log(arguments.length);

  return result / arguments.length;
}

console.log(
  getAverage (15.99, 25.50, 9.75),
  getAverage (100, 200, 150, 300),
  getAverage (50, 60, 70, 80, 90)
);