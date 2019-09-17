const root = document.querySelector('#cards');
const nextPageButton = document.querySelector('#nextPage');
const template = document.querySelector('#repo-template');

console.log(nextPageButton);
function renderRepos(repos) {
    root.innerHTML="";
    repos.forEach((repo) => {
        const { name, license, updated_at, forks_count, stargazers_count,
             html_url, description } = repo;
        const card = template.content.cloneNode(true);
        card.querySelector('.repo__title-link').textContent = name;
        card.querySelector('.repo__title-link').href = html_url;
        card.querySelector('.repo__description').textContent = description;
        card.querySelector('.repo__link_licence').textContent = license ? license.name : "";
        card.querySelector('.repo__link_updated').textContent = updated_at;
        card.querySelector('.repo__link_forks').textContent = forks_count;
        card.querySelector('.repo__link_stars').textContent = stargazers_count;
        root.appendChild(card);
    });
}
function fetchRepos(orgName, page = 1){
    return fetch(`https://api.github.com/orgs/${orgName}/repos?page=${page}`).then(r => r.json());
}
let currentPage = 1;
let orgName = 'facebook';
nextPageButton.addEventListener('click',function (){
    console.log(currentPage);
    currentPage++;

    fetchRepos(orgName, currentPage).then(renderRepos);
});

fetchRepos('facebook').then(renderRepos);
