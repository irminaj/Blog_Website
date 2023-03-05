const postContainer = document.getElementById("posts-container");
const logoutBtn = document.getElementById("logout-btn");
const user = JSON.parse(localStorage.getItem("user"));
const toggleButton = document.querySelector("#toggle-button");
const navbarLinks = document.querySelector("#links-container");

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

const API_ENDPOINTS = {
  getPosts: "https://testapi.io/api/irminaj/resource/newPosts",
  deletePost: (id) => `https://testapi.io/api/irminaj/resource/newPosts/${id}`,
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

const postTemplateforUsers = (data) => {
  const x = JSON.stringify(data);
  return `
    <div id=${data.id} class="post">
      <img src=${data.image}>
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <button class="delete" onClick=deletePost(${data.id})>Delete</button>
    </div>
  `;
};

const filterPosts = async (e) => {
  const userName = user.username;
  e.preventDefault();
  const data = await getPosts(API_ENDPOINTS.getPosts);
  const allPosts = data.data;
  // console.log(allPosts);
  const userPosts = allPosts.filter((item) => item.username === userName);
  console.log(userPosts);
  userPosts.forEach((post) => {
    postContainer.innerHTML += postTemplateforUsers(post);
  });
};

window.onload = async (e) => {
  e.preventDefault();
  if (localStorage.length > 0) {
    filterPosts(e);
    logoutBtn.style.display = "inline-block";
  } else {
    document.querySelector("#posts-container").textContent = "Please login!";
    logoutBtn.style.display = "none";
  }
};
