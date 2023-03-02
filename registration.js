const createUserForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const userNameInput = document.querySelector("#login-username");
const passwordInput = document.querySelector("#login-password");
const logoutBtn = document.querySelector("#logout-btn");
const message = document.querySelector("#message");

const API_ENDPOINTS = {
  createUser: "https://testapi.io/api/irminaj/resource/users",
  getUsers: "https://testapi.io/api/irminaj/resource/users",
};

const createUser = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const handleUserSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newUser = await createUser(API_ENDPOINTS.createUser, formData);
  console.log(newUser);
  e.target.reset();
};

createUserForm.addEventListener("submit", handleUserSubmit);

// Log in

const getUsers = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const handleLogin = async (e) => {
  e.preventDefault();
  const users = await getUsers(API_ENDPOINTS.getUsers);
  let foundUser = users.data.find((data) => findUser(data));
  if (foundUser) {
    localStorage.setItem("user", JSON.stringify(foundUser));
    location.reload();
  } else {
    message.textContent = "Credentials are incorrect! Try again!";
  }
};

const findUser = (data) => {
  let userNameValue = userNameInput.value;
  let passwordValue = passwordInput.value;
  return userNameValue === data.username && passwordValue === data.password;
};

loginForm.addEventListener("submit", handleLogin);

// Display correct forms

window.onload = () => {
  checkIfUserIsLoged();
};

const checkIfUserIsLoged = () => {
  if (localStorage.length > 0) {
    document.querySelector("#login-form").style.display = "none";
    document.querySelector("#account").textContent = "You are loged!";
    console.log("Client is already loged");
    document.querySelector(".register").style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    document.querySelector("#login-form").style.display = "flex";
    logoutBtn.style.display = "none";
  }
};

logoutBtn.addEventListener("click", () => {
  // e.preventDefault();
  localStorage.clear();
  loginForm.style.display = "inline-block";
  logoutBtn.style.display = "none";
  location.reload();
});
