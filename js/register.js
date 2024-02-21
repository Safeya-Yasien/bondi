const inputFullName = document.querySelector("#input-full-name"),
  inputEmail = document.querySelector("#input-email"),
  inputPassword = document.querySelector("#input-password"),
  passwordToggleBtn = document.querySelector("#pass-toggle");
(inputRepeatedPassword = document.querySelector("#input-repeated-password")),
  (loginButton = document.querySelector(".register-btn"));

loginButton.addEventListener("click", register);

function register(event) {
  event.preventDefault();

  const fullName = inputFullName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  const repeatedPassword = inputRepeatedPassword.value.trim();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  removeError();

  if (fullName === "") {
    showError(inputFullName, "Enter your full name");
  }
  if (!emailPattern.test(email)) {
    showError(inputEmail, "Enter a valid email address");
  }
  if (password === "") {
    showError(inputPassword, "Enter your password");
  }
  if (repeatedPassword === "") {
    showError(inputRepeatedPassword, "Enter your password");
  }
  if (
    password !== repeatedPassword &&
    repeatedPassword !== "" &&
    password !== ""
  ) {
    showError(inputRepeatedPassword, "Password Don't Match");
  }

  const errorInputs = document.querySelectorAll(".register-form .error");
  if (errorInputs.length > 0) return;

  const userData = {
    fullName: fullName,
    email: email,
    password,
    password,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  setInterval(redirectToLoginPage, 2000);
}

function showError(field, errorMessage) {
  field.classList.add("error");

  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerHTML = errorMessage;

  const parentElement = field.parentElement;

  parentElement.appendChild(errorElement);
}

function removeError(ele) {
  document
    .querySelectorAll(".register-form .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove("error"));
}

function redirectToLoginPage() {
  window.location.href = "../login.html";
}

passwordToggleBtn.addEventListener("click", () => {
  const type =
    inputPassword.getAttribute("type") === "password" ? "text" : "password";

  inputPassword.setAttribute("type", type);

  passwordToggleBtn.classList.toggle("fa-eye");
});
