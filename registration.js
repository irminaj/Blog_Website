const createUserForm = document.getElementById("register-form");

const API_ENDPOINTS = {
  createUser: "https://testapi.io/api/irminaj/resource/users",
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
