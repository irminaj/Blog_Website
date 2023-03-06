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
  console.log(allPosts.length);
  const userPosts = allPosts.filter((item) => item.username === userName);
  if (userPosts.length > 0) {
    console.log(userPosts);
    userPosts.forEach((post) => {
      postContainer.innerHTML += postTemplateforUsers(post);
    });
  } else {
    const paragraph = document.querySelector("#no-blogs-created");
    paragraph.textContent = "You didn't create any blogs yet!";
    paragraph.style = "text-align:center";
  }
};

window.onload = async (e) => {
  e.preventDefault();
  if (localStorage.length > 0) {
    filterPosts(e);
    logoutBtn.style.display = "inline-block";
  } else {
    const header = document.querySelector("#posts-container");
    header.innerHTML = `You need to <a href="register.html" class="link">login<a>to see your blog posts!`;
    header.style = "font-size: 1.5rem; font-weight:bold; text-align:center";
    logoutBtn.style.display = "none";
  }
};

// LogOut

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  logoutBtn.style.display = "none";
  location.reload();
});
