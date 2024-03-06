const input = document.querySelector(".input-value");
const uah = document.querySelector(".input-symbol");
const attention = document.querySelector(".attention");
const paymentCardElement = document.querySelector(".payment-card");
const sumEditButtons = document.querySelector(".payment-buttons");
const dataInputs = document.querySelectorAll(".input");
const name = document.querySelector("#name");
const comment = document.querySelector("#comment");
const expander = document.querySelector(".expander");
const splitter = document.querySelector(".splitter");
const splitterText = document.querySelector(".splitter-text");
const payButtons = document.querySelectorAll(".button-pay");
const collectedElement = document.querySelector(".collected");
const targetElement = document.querySelector(".target");
const jarPhoto = document.querySelector(".jar-photo");
const cardDetailsElement = document.querySelector(".card-details");
const cardPayButton = document.querySelector(".button-card-pay");

let collected, target;
checkLocalStorage();
updateJar();

input.addEventListener("input", validateInput);

input.addEventListener("keydown", function (event) {
  if (input.value === "" && event.key === "0") event.preventDefault();
});

sumEditButtons.addEventListener("click", function (event) {
  let element = event.target;
  if (element.classList.value === "payment-button") {
    input.value =
      Number(input.value) + Number(element.textContent.split(" ")[0]);
    validateInput();
  }
});

dataInputs.forEach((dataInput) => {
  dataInput.addEventListener("input", function () {
    if (this.value !== "") this.classList.add("active");
    else this.classList.remove("active");
  });
  dataInput.addEventListener("focus", function () {
    if (this.parentNode.classList.contains("subfield"))
      this.parentNode.parentNode.style.boxShadow = "0 0 0 2px #000";
    else this.parentNode.style.boxShadow = "0 0 0 2px #000";
  });
  dataInput.addEventListener("blur", function () {
    if (this.parentNode.classList.contains("subfield"))
      this.parentNode.parentNode.style.boxShadow = "none";
    else this.parentNode.style.boxShadow = "none";
  });
});

expander.addEventListener("click", function () {
  this.style.display = "none";
  splitterText.style.display = "block";
  cardDetailsElement.style.display = "block";
  splitter.style.margin = "20px auto 36px";
  paymentCardElement.style.margin = "42px auto 32px";
});

payButtons.forEach((button) => {
  button.addEventListener("click", pay);
});
cardPayButton.addEventListener("click", function (event) {
  event.preventDefault();
  pay();
});

function pay() {
  console.log(
    `Сума: ${input.value}\nІм'я: ${name.value}\nКоментар: ${comment.value}`
  );
  collected += Number(input.value);
  updateCollected();

  input.value = "";
  validateInput();

  dataInputs.forEach((dataInput) => {
    dataInput.value = "";
    dataInput.classList.remove("active");
  });

  updateJar();
}

function validateInput() {
  input.value = input.value.replace(/\D/g, "");
  if (Number(input.value) < 10) {
    uah.classList.add("invalid");
    input.classList.add("invalid");
    attention.style.visibility = "visible";
    cardPayButton.disabled = true;
  } else {
    uah.classList.remove("invalid");
    input.classList.remove("invalid");
    attention.style.visibility = "hidden";
    cardPayButton.disabled = false;
  }
  if (input.value > 29999) input.value = 29999;
  input.value = Number(input.value);
  input.style.width = input.value === "" ? "1ch" : input.value.length + "ch";
}

function checkLocalStorage() {
  collected = Number(localStorage.getItem("collected"));
  target = localStorage.getItem("target") ?? 200000;
  localStorage.setItem("target", target);
  collectedElement.textContent = collected + " ₴";
  targetElement.textContent = target + " ₴";
}

function updateCollected() {
  localStorage.setItem("collected", collected);
  collectedElement.textContent = collected + " ₴";
}

function updateJar() {
  let percent = target / 100;
  if (collected < 33 * percent)
    jarPhoto.style.backgroundImage = "url('images/uah_33.png')";
  else if (collected < 50 * percent)
    jarPhoto.style.backgroundImage = "url('images/uah_50.png')";
  else jarPhoto.style.backgroundImage = "url('images/uah_100.png')";
}
