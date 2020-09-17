import axios from 'axios';
import anime from 'animejs'


document.querySelector('.form_data').addEventListener('submit', (e) => {
      e.preventDefault();
      getSearch(); 
});

window.addEventListener('hashchange', function () {
   const mal_id = window.location.hash.replace('#', '')
     if (mal_id) {
      localStorage.data = ''
      localStorage.data = mal_id
       window.location = 'anime.html'
       
     }
  
});



console.log(localStorage)

localStorage.data = ''


async function getAnime(mal_id) {
  console.log(mal_id)
   await axios(`https://api.jikan.moe/v3/anime/${mal_id}`).then(data => {
         console.log(data);
   }).catch(err => {
     console.log(err)
   })

}



window.addEventListener('DOMContentLoaded', () => {
  init();
})

// Loads when browser is loaded
async function init () {

  await axios('https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/top/anime/1/favorite').then(data => {
     console.log(data.data.top)
     renderFavorites(data.data.top);
}).catch(err => {
  console.log(err)
})


function renderFavoritesDOM (data) {


  if (data.title.length > 15) {
    let currWord = '';
    console.log(`${data.title} is greater`)
       currWord += data.title
       let newWord = currWord.slice(0, 15) 
       newWord += '...'
       console.log(newWord)
  
       data.title = newWord;
       console.log(data.title)
  }


  const html = `<div class="card animate" style="width: 15rem;">
<img src="${data.image_url}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">User Rating: ${data.score}/10</p>
  <p class = "card-text">Episodes: ${data.episodes}</p>
  <a href="#${data.mal_id}" class="btn btn-primary">More</a>
</div>
</div>
`

console.log(data)


document.querySelector('.top_anime').insertAdjacentHTML('afterbegin', html);


anime({
  targets: '.card',
  translateX: 0,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});

}


function  renderFavorites(data) {
for (let i = 0; i < data.length; i++) {
  renderFavoritesDOM(data[i]);

}
}


}

 // Search function 
async function getSearch() {
  // Input box data
 let data = document.querySelector('._data').value
  // Alert when ever a search is preformed
 let alert = `<div class="alert alert-success animate"  role="alert">
 Success search sent!
 </div>`

 //Replaces current card
  document.getElementById('block').style.display = 'none';
 // Search results data
 let seachQuery = `<h1 class = 'searchresults'>Search results for: "${data}"</h1>`
   // Replaces content
 document.querySelector('._searchquery').innerHTML = ``
  document.querySelector('._results').innerHTML = ``
  document.querySelector('.top_anime').innerHTML = ``
 console.log(data)
 // Gets data from the api.
  await axios(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?q=${data}&page=1`).then(data => {
   console.log(data)
   sendInfo(data.data.results);
   document.querySelector('._searchquery').insertAdjacentHTML('afterbegin', seachQuery)
  }).catch(err => {
    let badAlert = `<div class="alert alert-danger" role="alert">Bad request please try again.`
    document.querySelector('.alerts').innerHTML = '';
    document.querySelector('.alerts').insertAdjacentHTML('afterbegin', badAlert)  
    console.log(err) 
    })

}

// Adds each element to the DOM
function renderDom (data) {


  if (data.title.length > 15) {
    let currWord = '';
    console.log(`${data.title} is greater`)
       currWord += data.title
       let newWord = currWord.slice(0, 15) 
       newWord += '...'
       console.log(newWord)
  
       data.title = newWord;
       console.log(data.title)
  }

const html = `<div class="card animate card2" style="width: 15rem;">
<img src="${data.image_url}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">Score: ${data.score}</p>
  <p class = "card-text"> Episodes: ${data.episodes}</p>
  <a href="#${data.mal_id}" class="btn btn-primary">More</a>
</div>
</div>
`
console.log(data)


document.querySelector('._results').insertAdjacentHTML('afterbegin', html)


}


function sendInfo(data) {
  for (let i = data.length - 1; i > 0; i--) {
    console.log(data[i])
    renderDom(data[i])
  } 
}
















