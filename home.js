const postContainer = document.getElementById("posts-container");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

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

const postTemplate = (data) => {
  const x = JSON.stringify(data);
  return `
    <div id=${data.id} class="post">
      <img src=${data.image}>
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <button class="delete" style="display:none" onClick=deletePost(${data.id})>Delete</button>
    </div>
  `;
};

window.onload = async (e) => {
  e.preventDefault();
  // const posts = await getPosts(API_ENDPOINTS.getPosts);
  if (localStorage.length > 0) {
    logoutBtn.style.display = "inline-block";
    // posts.data.forEach((post) => {
    //   postContainer.innerHTML += postTemplateforUsers(post);
    // });
  } else {
    logoutBtn.style.display = "none";
    // posts.data.forEach((post) => {
    //   postContainer.innerHTML += postTemplate(post);
    // });
  }
  const posts = await getPosts(API_ENDPOINTS.getPosts);
  posts.data.forEach((post) => {
    postContainer.innerHTML += postTemplate(post);
  });
};

// LogOut

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  // logoutBtn.style.display = "none";
  location.reload();
});

// const checkIfUserIsLoged = () => {
//   if (localStorage.length > 0) {
//     document.querySelector(".delete").style.display = "inline-block";
//     logoutBtn.style.display = "inline-block";
//   } else {
//     document.querySelector(".delete").style.display = "none";
//     logoutBtn.style.display = "none";
//   }
// };

// window.onload = async () => {
//   const posts = await getPosts(API_ENDPOINTS.getPosts);
//   posts.data.forEach((post) => {
//     postContainer.innerHTML += postTemplate(post);
//   });
//   checkIfUserIsLoged();
// };
