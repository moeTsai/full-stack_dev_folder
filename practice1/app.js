// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".slider");
// let animation = document.querySelector("section.animation-wrapper");

// const time_line = new TimelineMax();

// time_line.fromto(
//   hero,
//   1,
//   { height: "0%" },
//   { height: "100%", ease: Power2.easeInOut }
// );

window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  }
}

function setGPA() {
  convert = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };
  let formLen = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");

  let sum = 0;
  let creditSum = 0;
  console.log(credits[0].value, selects[0].value);

  for (let i = 0; i < credits.length; i++) {
    if (isNaN(parseInt(credits[i].value)) || isNaN(convert[selects[i].value])) {
      continue;
    }
    creditSum += parseInt(credits[i].value);
    sum += convert[selects[i].value] * parseInt(credits[i].value);
  }
  let res = 0;

  if (creditSum != 0) res = sum / creditSum;

  document.getElementById("result-gpa").innerText = res.toFixed(2);
}

let addButton = document.querySelector(".plus-button");
addButton.addEventListener("click", () => {
  let;
});
