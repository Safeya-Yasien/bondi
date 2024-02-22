

let githubUsername = "";

const profileName = document.querySelector(".navbar .profile");
const rowContainer = document.getElementById("repo-row");
const dataUser = JSON.parse(localStorage.getItem("userData"));

if (dataUser !== null) {
  profileName.innerHTML = dataUser.fullName;
  profileName.href = "./profile.html";
} else {
  profileName.innerHTML = "Login";
  profileName.href = "./login.html";
}

function getRepos() {
  displayPopupBox();
}

function displayPopupBox() {
  let popupOverlay = document.createElement("div");
  popupOverlay.className = "popup-overlay";

  let popupBox = document.createElement("div");
  popupBox.className = "popup-box";

  let closeButton = document.createElement("div");
  closeButton.className = "close-button";
  closeButton.innerHTML = "X";
  closeButton.addEventListener("click", closeWindow);

  const input = document.createElement("input");
  input.type = "text";
  input.className = "username";
  input.placeholder = "github username";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.className = "main-btn submit-button";

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    githubUsername = input.value.trim();
    closeWindow();
    displayRepos();
  });

  const container = document.createElement("div");
  container.appendChild(input);
  container.appendChild(submitButton);

  popupBox.appendChild(container);

  popupBox.appendChild(closeButton);

  popupOverlay.appendChild(popupBox);

  document.body.appendChild(popupOverlay);

  input.focus();
}

function closeWindow() {
  let popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.remove();
}

function displayRepos() {
  if (githubUsername !== "") {
    const api = `https://api.github.com/users/${githubUsername}/repos`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => createRepoInfo(data));
  }
}

function createRepoInfo(data) {
  rowContainer.innerHTML = "";

  data.forEach((repo) => {
    let repoCol = document.createElement("div");
    repoCol.className = "col-md-6 col-lg-4";
    let repoContainer = document.createElement("div");
    repoContainer.className = "repo";

    let repoName = document.createElement("h4");
    repoName.id = "repo-name";
    repoName.innerHTML = `${repo.name}`;

    let repoUl = document.createElement("a");
    repoUl.id = "repo-url";
    repoUl.href = `${repo.html_url}`;
    repoUl.innerHTML = `Repo Url: ${repoUl.href}`;

    let repoStars = document.createElement("p");
    repoStars.id = "repo-stars";
    repoStars.innerHTML = `Repo Stars: ${repo.stargazers_count}`;

    let repoLang = document.createElement("p");
    repoLang.id = "repo-lang";
    repoLang.innerHTML = `Repo Language: ${repo.language}`;

    let repoClone = document.createElement("a");
    repoClone.id = "repo-clone";
    repoClone.href = `${repo.clone_url}`;
    repoClone.innerHTML = `Repo Clone: ${repoClone.href}`;

    let repoDate = document.createElement("p");
    repoDate.id = "repo-date";
    repoDate.innerHTML = `Repo Date: ${repo.created_at}`;

    repoContainer.appendChild(repoName);
    repoContainer.appendChild(repoUl);
    repoContainer.appendChild(repoStars);
    repoContainer.appendChild(repoLang);
    repoContainer.appendChild(repoClone);
    repoContainer.appendChild(repoDate);

    repoCol.appendChild(repoContainer);
    rowContainer.appendChild(repoCol);
  });
}
