import './style.css'

// Generates some fake kitten data.
const KITTENS = Array.from({length: 5}, (_, k) => ({
  id: k
}));

// We are using let here because const would make it so that we couldn't use the `filter` function the way we are.
let FAVORITE_KITTENS = [];

function renderKitten(kitten) {
  // Creates the kitten div
  const kittenCard = document.createElement('div');
  // Sets name
  kittenCard.className = "kitten card";
  // dataset is a property on HTMLElements, and allows us to store simple information in HTML properties. here we are storing the kitten's ID
  kittenCard.dataset.kittenId = kitten.id;
  // Make an image
  const img = document.createElement('img');
  // set source
  img.src = `https://placekitten.com/220/220?variant=${kitten.id % 6}`;
  // images should in general have an alt tag
  img.setAttribute('alt', 'Adorable kitten');
  // see previous dataset note
  img.dataset.kittenId=kitten.id;
  // add image to kitten card
  kittenCard.append(img);
  // make button
  const button = document.createElement('button');
  // add class
  button.classList.add('like-button');
  // set text
  button.innerText = 'Like';
  // set kittenId ( see above )
  button.dataset.kittenId = kitten.id;
  // append button
  kittenCard.append(button);
  // return the new element.
  return kittenCard;
}

/**
 * 
 * @param {HTMLElement} root 
 * @param {any[]} kittens 
 */
function renderKittens(root, kittens) {
  // map the kitten data into HTMLElements
  const els = kittens.map(renderKitten);
  // Append the root HTMLElement with the newly generated items.
  root.append(...els);
}
/**
 * 
 * @param {HTMLElement} root 
 * @param {*} kittens 
 */
function renderFavoriteKittens(root, kittens) {
  // since this will be updated frequently we have to remove anything currently rendered (unoptimal, but easiest)
  root.innerHTML = '';
  // iterate over the kittens
  for(const kitten of kittens) {
    // create a kitten element
    const el = document.createElement('div');
    // here we are using a CSS query to find an element (or not) that has our kitten's ID as their data-kitten-id value.
    const imgSrc = document.querySelector(`img[data-kitten-id="${kitten}"]`);
    // If we find an image by that CSS Query, we continue in here
    if (imgSrc) {
      // Create an image element
      const img = document.createElement('img');
      // set our new images source to the source of the one we found.
      img.src = imgSrc.src;
      // append the image to the kitten element
      el.append(img);
      // append the kitten element to the root element
      root.append(el);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Look for an element by a CSS ID Selector
  const root = document.querySelector('#kitten-container');
  // Look for an element by a CSS ID selector
  const favRoot = document.querySelector('#favorite-kittens');
  // Render the kittens in the #kitten-container root
  renderKittens(root, KITTENS);
  // Render the favorite kittens in the #favorite-kittens element.
  // NOTE: these two are separate because renderFavoriteKittens removes all elements from the container. Keeping them in one container
  // means having to re-render everything when we like/dislike a kitten.
  renderFavoriteKittens(favRoot, FAVORITE_KITTENS);

  // Adds a general listener on the container so that we don't have to attach an event listener to every single item.
  // Events in JS bubble up, so any event on any element inside #kitten-container will come up to here unless explicitly stopped
  // by some code.
  root.addEventListener('click', e => {
    // If the click event's target matches the CSS selector for one of our buttons
    if(e.target.matches('button.like-button[data-kitten-id]')) {
      // and that button has text that is equal to 'Like'...
      if(e.target.innerText === 'Like') {
        // set the inner text to be unlike
        e.target.innerText = 'Unlike';
        // Add the item to the favorite kittens
        FAVORITE_KITTENS.push(e.target.dataset.kittenId);
        // Re-rendre that hoe
        renderFavoriteKittens(favRoot, FAVORITE_KITTENS); 
      } else {
        // OTHERWISE, set the text to 'Like';
        e.target.innerText = 'Like';
        // and remove the kitten from the favorites
        FAVORITE_KITTENS = FAVORITE_KITTENS.filter(kitten => {
          return kitten !== e.target.dataset.kittenId
        })
        // Re-render that hoe
        renderFavoriteKittens(favRoot, FAVORITE_KITTENS);
      }
    }
  });
})
