const postContainer = document.getElementById("posts-container");

const API_ENDPOINTS = {
  getPosts: "https://testapi.io/api/irminaj/resource/newPosts",
  deletePost: (id) => `https://testapi.io/api/irminaj/resource/newPosts/${id}`,
};

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
      <button class="delete" onClick=deletePost(${data.id})>Delete</button>
    </div>
  `;
};

window.onload = async () => {
  const posts = await getPosts(API_ENDPOINTS.getPosts);
  posts.data.forEach((post) => {
    postContainer.innerHTML += postTemplate(post);
  });
};
