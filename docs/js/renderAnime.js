
window.addEventListener('DOMContentLoaded', function () {
   getAnime();
});


async function getAnime () {



await fetch(`https://api.jikan.moe/v3/anime/${localStorage.data}`).then(data => {

document.querySelector('.spinner-border').style.display = 'none'
document.querySelector('.anime_container').classList.remove("hidden");
console.log(data)
return data.json();
}).then(info => {
    console.log(info)
    renderAnime(info);

})


}



document.querySelector('.grey_btn').addEventListener('click', function () {

window.location = 'index.html'

});



function renderAnime(info) {
  let html = `
    <img src = ${info.image_url} class = 'image_resize'>
    <h1 class = 'title_text'>${info.title}</h1>
    <h1 class = 'rank_ani'><em>Rank: ${info.rank}</em></h1>
    `
  document.querySelector('.white_border').insertAdjacentHTML('afterbegin', html)

}