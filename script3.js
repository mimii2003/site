//TMDB 

const API_KEY = 'api_key=9eade6d3556fcc25738d48117ef5a679';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/top_rated?'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genres = [   
  ]
setGenre();
function setGenre() {
}





getMovies(API_URL);
// funncao abaixo mostra os filmes 
function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">Não existem filmes correspondentes a essa pesquisa</h1>`
        }
       
    })

}


function showMovies(data) {
    main.innerHTML = '';
// funcao mostra o titulo, a imagem, o voto e o resumo
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id, release_date} = movie;
  
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <h2>Data de lançamento: ${release_date}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Sinopse</h3>
                ${overview}
                <br/> 
                <a href="https://www.themoviedb.org/movie/${id}-${title}"id="${id}"><button style="background: #069cc2; border-radius: 6px; padding: 15px; cursor: pointer; color: #fff; border: none; font-size: 16px;">Saiba Mais</button></a>
            </div>
        
        `

        main.appendChild(movieEl);
        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}

// muda as cores das notas dos filmes
function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "yellow"
    }else{
        return 'red'
    }
}
//faz a pesquisa
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

