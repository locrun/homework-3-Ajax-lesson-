const loadBtn = document.querySelector(".js-load");
const searchInput = document.querySelector(".js-input");
const cardContainer = document.querySelector(".card-container");
const responseContainer = document.querySelector(".response-container");

const gitHubApiUrl = "https://api.github.com/users/";
const jsonPlApiUrl = "https://jsonplaceholder.typicode.com/posts";

function createMarkup(data) {
  if (!data.length) {
    console.log(data);
    responseContainer.innerHTML += `
        <img src="${data.avatar_url}">
        <p> Имя: <span>${data.name}</span><p>
        <p> О себе: <span>${data.bio}</span><p>
        <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
    `;
  }

  if (data.length) {
    console.log(data);
    data.map((user) => {
      cardContainer.innerHTML += `
        <div class="user-card">
          <img src=${"https://i.pravatar.cc/300"}>
            <div class="txt-wrapper">
            <p> <span>Имя:</span> <span>${user.title}</span><p>
            <p> <span>О себе: </span><span>${user.body}</span><p>
          </div>
          </div>
         </div>
        `;
    });
  }
}

loadBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();

  function notifyUser() {
    return (responseContainer.innerHTML = `
            <h1 class="error">Пользователь не найден</h1>
        `);
  }

  if (searchValue !== "") {
    fetch(`${gitHubApiUrl}${searchValue}`)
      .then((response) =>
        response.ok ? response.json() : new Promise(notifyUser)
      )
      .then((data) => createMarkup(data))
      .catch((error) => console.log(error));
    searchInput.value = "";
    responseContainer.innerHTML = "";
  }
  axios
    .get(`${jsonPlApiUrl}?_limit=10`)
    .then((response) => response)
    .then((data) => createMarkup(data.data))
    .catch((error) => console.log(error));
  cardContainer.innerHTML = "";
});
