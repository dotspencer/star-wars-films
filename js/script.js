const PHOTOS_URL = 'https://gist.githubusercontent.com/dotspencer/f57718f800b3057f5119fcc244b3d169/raw';
const FILMS_URL = 'https://gist.githubusercontent.com/dotspencer/f2db94b3bab2f52df157d1f0b86011ea/raw';

(async () => {
  const list = document.querySelector('.list');

  console.log('Requesting photos...');
  const photos = await fetch(PHOTOS_URL).then(res => res.json());

  console.log('Requesting films...');
  const { results: films } = await fetch(FILMS_URL).then(res => res.json());
  console.log('films:', films);

  for (let i = 0; i < films.length; i++) {
    const data = films[i];
    const filmDiv = create('div', ['film']);
    const title = create('div', ['title']);
    title.innerText = data.title;
    const thumb = create('img');
    thumb.src = photos[data.episode_id];
    filmDiv.appendChild(thumb);
    filmDiv.appendChild(title);
    list.appendChild(filmDiv);
  }
})();

function create(name, classList = []) {
  const el = document.createElement(name);
  classList.forEach(c => el.classList.add(c));
  return el;
}
