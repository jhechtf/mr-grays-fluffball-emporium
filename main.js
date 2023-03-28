import './style.css'

const KITTENS = Array.from({length: 5}, (_, k) => ({
  id: k
}));

let FAVORITE_KITTENS = [];

function renderKitten(kitten) {
  const kittenCard = document.createElement('div');
  kittenCard.className = "kitten card";
  kittenCard.dataset.kittenId = kitten.id;
  const img = document.createElement('img');
  img.src = `https://placekitten.com/220/220?variant=${kitten.id % 6}`;
  img.setAttribute('alt', 'Adorable kitten');
  img.dataset.kittenId=kitten.id;
  kittenCard.append(img);
  const button = document.createElement('button');
  button.classList.add('like-button');
  button.innerText = 'Like';
  button.dataset.kittenId = kitten.id;
  kittenCard.append(button);
  return kittenCard;
}

/**
 * 
 * @param {HTMLElement} root 
 * @param {any[]} kittens 
 */
function renderKittens(root, kittens) {
  const els = kittens.map(renderKitten);
  root.append(...els);
}
/**
 * 
 * @param {HTMLElement} root 
 * @param {*} kittens 
 */
function renderFavoriteKittens(root, kittens) {
  // Flesh this out to render the kittens down in the favorite zone.
  root.innerHTML = '';
  for(const kitten of kittens) {
    const el = document.createElement('div');
    const imgSrc = document.querySelector(`img[data-kitten-id="${kitten}"]`);
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc.src;
      el.append(img);
      root.append(el);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#kitten-container');
  const favRoot = document.querySelector('#favorite-kittens');
  renderKittens(root, KITTENS);
  renderFavoriteKittens(favRoot, FAVORITE_KITTENS);

  root.addEventListener('click', e => {
    if(e.target.matches('button.like-button[data-kitten-id]')) {
      if(e.target.innerText === 'Like') {
        e.target.innerText = 'Unlike';
        FAVORITE_KITTENS.push(e.target.dataset.kittenId);
        renderFavoriteKittens(favRoot, FAVORITE_KITTENS); 
      } else {
        e.target.innerText = 'Like';
        FAVORITE_KITTENS = FAVORITE_KITTENS.filter(kitten => {
          return kitten !== e.target.dataset.kittenId
        })
        renderFavoriteKittens(favRoot, FAVORITE_KITTENS);
      }
    }
  });
})
