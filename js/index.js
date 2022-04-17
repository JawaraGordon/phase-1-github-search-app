document.addEventListener('DOMContentLoaded', () => {
  getForm();
});

// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

getForm = () => {
  const userForm = document.getElementById('github-form');
  console.log(userForm);

  userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const BASE_URL = 'http://api.github.com/search/users?q=';
    const userInput = document.getElementById('search').value;
    console.log(userInput);
    fetch(`${BASE_URL} + ${userInput}`)
      .then((res) => res.json())
      .then((data) => showData(data));
    console.log(showData(data));
  });
};
showData = (fetchData) => {
  const userList = document.getElementById('user-list');
  console.log(userList);
  fetchData.items.forEach((user) => {
    const list = document.createElement('li');
    list.textContent = user.login;
    userList.appendChild(list);
    console.log(userList);
    const div = document.createElement('div');
    console.log(div);
    const userAvatar = document.createElement('img');
    console.log(userAvatar);
    userAvatar.src = user.avatar_url;
    const userRepo = document.createElement('p');
    console.log(userRepo);
    userRepo.textContent = user.url;
    div.append(userAvatar, userRepo);
    userList.append(div);
    userList.addEventListener('mouseover', () => {
      const text = user.login;
      console.log(user.login);
      fetch(`https://api.github.com/users/${text}/repos`)
        .then((res) => res.json())
        .then((data) => showRepo(data));
      console.log(data);
    });
  });
};
showRepo = (repos) => {
  const repoDiv = document.getElementById('repos-list');
  console.log(repoDiv);
  repos.forEach((repo) => {
    const listItem = document.createElement('li');
    console.log(listItem);
    const link = document.createElement('a');
    console.log(link);
    link.href = repo.html_url;
    link.innerText = repo.name;
    listItem.appendChild(link);
    repoDiv.appendChild(listItem);
  });
};
