const inputEmail = document.querySelector("#input-email"),
  inputPassword = document.querySelector("#input-password"),
  passwordToggleBtn = document.querySelector("#pass-toggle"),
  invalidDataContainer = document.querySelector(".login-form .invalid-data"),
  loginButton = document.querySelector(".login-btn");

loginButton.addEventListener("click", login);

function login(event) {
  event.preventDefault();

  let email = inputEmail.value.trim();
  let password = inputPassword.value.trim();

  removeError();

  if (email === "") {
    showError(inputEmail, "Enter a valid email address");
  }
  if (password === "") {
    showError(inputPassword, "Enter your password");
  }

  getDataUserFromLocalStorage(email, password);
}

function getDataUserFromLocalStorage(email, password) {
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  if (dataUser !== null) {
    if (email === dataUser.email && password === dataUser.password) {
      setInterval(redirectToHomePage, 1000);
    } else {
      if (email !== "" && password !== "")
        invalidData("Email or password is wrong");
    }
  }
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
    .querySelectorAll(".login-form .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove("error"));
}

function invalidData(message) {
  invalidDataContainer.innerHTML = message;
}

function redirectToHomePage() {
  window.location.href = "./index.html";
}

passwordToggleBtn.addEventListener("click", () => {
  const type =
    inputPassword.getAttribute("type") === "password" ? "text" : "password";

  inputPassword.setAttribute("type", type);

  passwordToggleBtn.classList.toggle("fa-eye");
});
