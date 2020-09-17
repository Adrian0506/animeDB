
window.addEventListener('DOMContentLoaded', function () {
   getAnime();
});


async function getAnime () {

    await fetch(`https://api.jikan.moe/v3/anime/${localStorage.data}/characters_staff`).then(datas => {
        return datas.json();
    }).then(infos => {
        console.log(infos)
        renderCharacters(infos.characters);
    })

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

function renderCharacters(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        renderCharacterDOM(data[i])
        if (i === 6) {
            break;
        }
    } 
}


function renderCharacterDOM(data) {
 let html = `
  <div class = 'chars_container'>
 <img src = '${data.image_url}' class = 'char_resize'>
  <h1= 'char_name'>${data.name}</h1>
 </div>`
 

document.querySelector('.white_border').insertAdjacentHTML('afterbegin', html)
}




document.querySelector('.grey_btn').addEventListener('click', function () {

window.location = 'index.html'

});



function renderAnime(info, char) {
let genres = ''

for (let i = 0; i < info.genres.length; i++) {
  console.log(info.genres[i].name)
genres += info.genres[i].name + ', '

}




  let html = `
    <img src = ${info.image_url} class = 'image_resize'>
    <h1 class = 'title_text'><b>${info.title}</b></h1>
    <h1 class = 'rank_ani'><em>Rank: ${info.rank}</em></h1>
    <h1 class = 'rank_score'><em>Score: ${info.score}/10</em></h1>
    <h1 class = 'synp'>Synopsis:</h1>
     <div class ='synp-block'>
    <h1 class = 'anime_synp'>${info.synopsis}</h1>
    </div>
      <div class = 'anime_gen_container'>
     <h1 class = 'anime_gen'>Genres: ${genres}</h1>
     <h1 class = 'text_char'>Characters:</h1>
      </div>
     `
  document.querySelector('.white_border').insertAdjacentHTML('afterbegin', html)

}