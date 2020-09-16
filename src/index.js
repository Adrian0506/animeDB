import axios from 'axios';

document.querySelector('.form_data').addEventListener('submit', (e) => {
      e.preventDefault();
      getSearch(); 
});




async function getSearch() {
 let data = document.querySelector('._data').value
 console.log(data)
  axios(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?q=${data}&page=1`).then(data => {
   console.log(data)
     sendInfo(data.data.results);
  }).catch(err => {
      console.log(err) 
    })

}


function renderDom (data) {
const html = `<div class="card" style="width: 15rem;">
<img src="${data.image_url}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">${data.synopsis}</p>
  <a href="#${data.mal_id}" class="btn btn-primary">More</a>
</div>
</div>
`
console.log(data)
document.querySelector('._results').insertAdjacentHTML('afterbegin', html)


}


function sendInfo(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    renderDom(data[i])
  } 
}