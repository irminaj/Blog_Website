const postContainer = document.getElementById("posts-container");
const loginForm = document.getElementById("login-form");
const userNameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const logoutBtn = document.getElementById("logout-btn");

const API_ENDPOINTS = {
  getPosts: "https://testapi.io/api/irminaj/resource/newPosts",
  deletePost: (id) => `https://testapi.io/api/irminaj/resource/newPosts/${id}`,
  getUsers: "https://testapi.io/api/irminaj/resource/users",
};

// Get posts

const getPosts = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const deletePost = (id) => {
  const url = API_ENDPOINTS.deletePost(id);
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      response.status === 204 && document.getElementById(id).remove();
    })
    .catch((err) => console.log(err));
};

const postTemplate = (data) => {
  const x = JSON.stringify(data);
  return `
    <div id=${data.id} class="post">
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <img src=${data.image}>
      <button class="delete" style="display:none" onClick=deletePost(${data.id})>Delete</button>
    </div>
  `;
};

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
  localStorage.setItem("user", JSON.stringify(foundUser));
  location.reload();
};

const findUser = (data) => {
  let userNameValue = userNameInput.value;
  let passwordValue = passwordInput.value;
  return userNameValue === data.username && passwordValue === data.password;
};

loginForm.addEventListener("submit", handleLogin);

// LogOut

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  document.querySelector(".delete").style.display = "none";
  loginForm.style.display = "inline-block";
  logoutBtn.style.display = "none";
});

const checkIfUserIsLoged = () => {
  if (localStorage.length > 0) {
    document.querySelector(".delete").style.display = "inline-block";
    loginForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    document.querySelector(".delete").style.display = "none";
    loginForm.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
};

window.onload = async () => {
  const posts = await getPosts(API_ENDPOINTS.getPosts);
  posts.data.forEach((post) => {
    postContainer.innerHTML += postTemplate(post);
  });
  checkIfUserIsLoged();
};
