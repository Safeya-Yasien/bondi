// //
// //
// // link of home page
// //
// //
// //

// let inputEmail = document.querySelector(".input-email");
// let inputPassword = document.querySelector(".input-password");
// let loginButton = document.querySelector(".login-btn");

// loginButton.addEventListener("click", login);

// function login(event) {
//   event.preventDefault();

//   let validInputEmail = inputEmail.value.trim();
//   let validInputPassword = inputPassword.value.trim();

//   if (checkEmpty(validInputEmail, validInputPassword)) {
//     if (checkEmail(validInputEmail)) {
//       addUserInfoToLocalStorage();
//     }
//   }
// }

// function checkEmpty(validInputEmail, validInputPassword) {
//   if (validInputEmail !== "" && validInputPassword !== "") return true;
//   else return false;
// }

// function checkEmail(validInputEmail) {
//   if (validInputEmail.includes("a")) return true;
//   else return false;
// }

// function addUserInfoToLocalStorage(validInputEmail, validInputPassword) {
//   localStorage.setItem("email", validInputEmail);
//   localStorage.setItem("password", validInputPassword);

//   setInterval(redirectToHomePage(), 2000);
// }

// function redirectToHomePage() {
//   window.location.href = "";
// }
