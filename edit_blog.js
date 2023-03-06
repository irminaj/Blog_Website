const title = document.querySelector("#title");
const content = document.querySelector("#content");
const image = document.querySelector("#image");
const editForm = document.querySelector("#create-post");
const postInfo = JSON.parse(sessionStorage.getItem("post"));

const API_ENDPOINTS = {
  getPostById: (id) => `https://testapi.io/api/irminaj/resource/newPosts/${id}}`,
  edit: (id) => `https://testapi.io/api/irminaj/resource/newPosts/${id}`,
};

const editData = (url, data) => {
  return fetch(url, {
    method: "PUT",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

window.onload = (e) => {
  console.log(postInfo);
  title.value = postInfo.title;
  content.value = postInfo.content;
  image.value = postInfo.image;
};

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const postId = postInfo.id;
  const userName = postInfo.username;
  const formData = new FormData(e.target);
  formData.append("username", userName);
  const updatedPost = await editData(API_ENDPOINTS.edit(postId), new URLSearchParams(formData));
  console.log(updatedPost);
  location.href = "my_blog_posts.html";
});
