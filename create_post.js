const createPostForm = document.getElementById("create-post");

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
  const formData = new FormData(e.target);
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
    alert("Please, log in");
  }
};

// sutvarkyti log in/log out mygtukus
