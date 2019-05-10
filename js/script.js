const PHOTOS_URL = 'https://gist.githubusercontent.com/dotspencer/f57718f800b3057f5119fcc244b3d169/raw';
const FILMS_URL = 'https://gist.githubusercontent.com/dotspencer/f2db94b3bab2f52df157d1f0b86011ea/raw';

const list = document.querySelector('.list');

(async () => {
  console.log('Requesting photos...');
  const photos = await fetch(PHOTOS_URL).then(res => res.json());

  console.log('Requesting films...');
  const { results: films } = await fetch(FILMS_URL).then(res => res.json());
  console.log('films:', films);

  for (let i = 0; i < films.length; i++) {
    const data = films[i];
    const filmDiv = create('div', ['film']);
    const rightDiv = create('div', ['right']);

    const title = create('div', ['title'], data.title);

    const thumb = create('img');
    thumb.src = photos[data.episode_id];

    const playButton = create('button', ['play'], 'Play');
    playButton.addEventListener('click', () => play(data.opening_crawl));

    rightDiv.appendChild(title);
    rightDiv.appendChild(playButton);

    filmDiv.appendChild(thumb);
    filmDiv.appendChild(rightDiv);

    list.appendChild(filmDiv);
  }
})();

function play(crawlText) {
  const overlay = create('div', ['overlay']);
  const screen = create('div', ['screen']);
  const text = create('div', ['text'], crawlText);
  overlay.appendChild(screen);
  screen.appendChild(text);
  document.body.appendChild(overlay);

  // close modal
  overlay.addEventListener('click', () => {
    overlay.outerHTML = '';
  });
}

function create(name, classList = [], innerText) {
  const el = document.createElement(name);
  classList.forEach(c => el.classList.add(c));
  if (innerText) {
    el.innerText = innerText;
  }
  return el;
}
