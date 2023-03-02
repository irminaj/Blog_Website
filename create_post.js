const createPostForm = document.getElementById("create-post");
const logoutBtn = document.querySelector("#logout-btn");
const user = JSON.parse(localStorage.getItem("user"));

const API_ENDPOINTS = {
  createPost: "	https://testapi.io/api/irminaj/resource/newPosts",
};

const createPost = (url, data) => {
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

const handlePostSubmit = async (e) => {
  e.preventDefault();
  const userName = user.username;
  const formData = new FormData(e.target);
  formData.append("username", userName);
  console.log(formData);
  const newPost = await createPost(API_ENDPOINTS.createPost, formData);
  console.log(newPost);
  e.target.reset();
};

createPostForm.addEventListener("submit", handlePostSubmit);

window.onload = async () => {
  if (localStorage.length > 0) {
    createPostForm.style = "display:flex; flex-direction:column";
  } else {
    createPostForm.style.display = "none";
    document.querySelector("#create-post-header").innerHTML = `You need to <a href="register.html" class="link">login<a> to create a post!`;
  }
};

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  createPostForm.style.display = "none";
  document.querySelector("#create-post-header").innerHTML = `You need to <a href="register.html" class="link">login<a> to create a post!`;
  logoutBtn.style.display = "none";
  location.reload();
});
