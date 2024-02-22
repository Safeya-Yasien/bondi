// github stars count user
// github follwers user

const username = document.querySelector("#username");
const getdataUserNameFromLocalStorage = JSON.parse(
  localStorage.getItem("userData")
);

if (getdataUserNameFromLocalStorage !== null) {
  username.innerHTML = getdataUserNameFromLocalStorage.fullName;
}

function getSocialLinks(id) {
  displayPopupBox(id);
}

function displayPopupBox(buttonId) {
  let popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";

  let popupBox = document.createElement("div");
  popupBox.className = "popup-box";

  let closeButton = document.createElement("div");
  closeButton.className = "close-button";
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", closeWindow);

  let socialLink = takeLink(buttonId);

  popupBox.appendChild(socialLink);

  popupBox.appendChild(closeButton);

  popupOverlay.appendChild(popupBox);

  document.body.appendChild(popupOverlay);
}

function closeWindow() {
  let popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.remove();
}

function takeLink(buttonId) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "social-link";
  input.placeholder = buttonId + " Link";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.className = "main-btn submit-button";

  submitButton.addEventListener("click", (e) => {
    // e.preventDefault();
    addLink(buttonId);
  });

  const container = document.createElement("div");
  container.appendChild(input);
  container.appendChild(submitButton);

  return container;
}

function addLink(buttonId) {
  const inputField = document.querySelector(".social-link");
  const inputFieldValue = inputField.value.trim();

  if (inputFieldValue !== "") {
    let linkPrefix = "";

    if (buttonId === "github") {
      linkPrefix = "https://github.com/";
    } else if (buttonId === "twitter") {
      linkPrefix = "https://twitter.com/";
    } else if (buttonId === "linkedin") {
      linkPrefix = "https://www.linkedin.com/in/";
    }

    getRepoUser(inputFieldValue);

    const finalLink = linkPrefix + inputFieldValue;

    const linkElement = document.querySelector(`#${buttonId} a`);

    closeWindow();

    const button = document.getElementById(buttonId);
    button.style.cssText =
      "border-color: var(--white-color);background-color: var(--text-color)";
  }
}

function getRepoUser(username) {
  const api = "https://api.github.com/users/";
  let repoUserUrl = `${api}${username}/repos`;

  // reposLinks.innerHTML = "";

  fetch(repoUserUrl)
    .then((response) => response.json())
    .then((repos) => getRepoInfo(repos))
    .catch((error) => {
      Swal.fire({
        text: "Error fetching user repositories. Please try again later.",
        icon: "error",
      });
    });
}

function getRepoInfo(repos) {
  const repoNumber = document.querySelector("#repo-number");
  const repoStars = document.querySelector("#repo-stars");
  const repoFollwer = document.querySelector("#repo-follwer");

  repoNumber.innerHTML = repos.length;
  repoStars.innerHTML = repos.stargazers;
  repoFollwer.innerHTML = "";

  console.log(repoStars);
}
