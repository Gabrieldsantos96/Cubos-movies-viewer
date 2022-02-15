const movies = document.querySelector('.movies');
const input = document.querySelector('.input');
const modal = document.querySelector('.modal');
const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');

let filmesArray = [];
let paginaAtual = [];
let i = 0;

function iniciar () {
 fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(filmes => filmes.json()).then(resposta => {
    const {results} = resposta;
  

    results.forEach((filme) =>  {
      paginaAtual.push(filme);

      if(paginaAtual.length === 5) {
        filmesArray.push(paginaAtual);
        paginaAtual = [];
      }

    }
  )
  
  popularFilmes(i);
  
  });
}

iniciar();

function popularFilmes (pagina) {
  filmesArray[pagina].forEach((filme)=> {


  const movie = document.createElement('div');
  movie.classList.add('movie');
  
  const info = document.createElement('div');
  info.classList.add('movie__info');
  const tituloFilme = document.createElement('span');
  tituloFilme.classList.add('movie__title');
  const avalFilme = document.createElement('span');
  avalFilme.classList.add('movie__rating');
  const imgEstrela = document.createElement('img');
  const id = document.createElement('span');
  id.classList.add('id__filme');
  id.textContent = filme.id;
  movie.style.background = (!filme.poster_path) ? 'url(https://via.placeholder.com/320?text=sem+foto)' : `url(${filme.poster_path})` ;
  movie.style.backgroundSize = "cover"
  movie.style.backgroundPosition = "center";
  tituloFilme.textContent = filme.title;
  avalFilme.textContent = filme.vote_average;
  imgEstrela.src = ('./assets/estrela.svg');

  avalFilme.append(imgEstrela);
  info.append(tituloFilme,avalFilme);
  movie.append(id,info);
  movies.append(movie);
  
  movie.addEventListener('click',function() {
    const pegarId = movie.querySelector('.id__filme');
    abrirModal(pegarId.textContent);
  })

})

}

  input.addEventListener('keydown',(event) => {
    if (event.key === 'Enter' && input.value !== '') {
      movies.innerHTML = '';
      filmesArray = [];
      i = 0;
      paginaAtual = [];
      // console.log(movies);
      // console.log(filmesArray);
      // console.log(i);
      // console.log(paginaAtual);
      
    
      fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=' + input.value).then(filmes => filmes.json()).then(resposta => {
        const {results} = resposta;

      results.forEach((filme) =>  {
        paginaAtual.push(filme);
  
        if(paginaAtual.length === 5) {
          filmesArray.push(paginaAtual);
          paginaAtual = [];
        }
        
      }
      
    )
    
    popularFilmes(i);
    
    });
  } else if (event.key === 'Enter' && input.value === '') {
    
    movies.innerHTML = '';
    filmesArray = [];
    i = 0;
    paginaAtual = [];
      iniciar();
  } 
    
      });


 


const pegarHighlits = async () => {
  const resposta01 =  await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR')
  const info01 = await resposta01.json();
  const {backdrop_path,genres,title,vote_average,release_date,overview} = info01;

  const plano_de_Fundo = document.querySelector('.highlight__video');
  plano_de_Fundo.style.backgroundImage = `url(${backdrop_path})`
  plano_de_Fundo.style.backgroundSize = '118%';
  plano_de_Fundo.style.backgroundPosition = "center";

  const titulo = document.querySelector('.highlight__title')
  titulo.textContent = title;

  const votacao = document.querySelector('.highlight__rating');
  votacao.textContent = vote_average;

  const lancamento = document.querySelector('.highlight__launch');
  lancamento.textContent = String(release_date);

  const descricao = document.querySelector('.highlight__description');
  descricao.textContent = overview;

  
  const generos = document.querySelector('.highlight__genres');
  for ( genre of genres ) {
    if (genre.name !== 'Fantasia') {
    generos.textContent += `${genre.name}, `;
  } else {
    generos.textContent += genre.name;
  }

}

const resposta02 = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR')
  const info02 = await resposta02.json();
  const {results} = info02;

  const videoLink = document.querySelector('.highlight__video-link');
  videoLink.href = `https://www.youtube.com/watch?v=${results[1].key}`
  
 

};
pegarHighlits();

const abrirModal = async(id) =>  {

 modal.style.display = 'flex';

  const resposta = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/' + id + '?language=pt-BR');
  const filmes = await resposta.json();
    const {backdrop_path,genres,vote_average,title,overview} = filmes;
  const filme = document.querySelector('.modal');
  filme.classList.remove('hidden');
  const tituloModal = document.querySelector('.modal__title');
  const imagemModal = document.querySelector('.modal__img');
  const textoModal = document.querySelector('.modal__description');
  const votosModal = document.querySelector('.modal__average');
  const generos = document.querySelector('.modal__genre');
  tituloModal.textContent = title;
  imagemModal.src = (!backdrop_path) ? 'https://via.placeholder.com/320?text=sem+foto' : backdrop_path;
  textoModal.textContent = overview;
  votosModal.textContent = vote_average;
  generos.textContent = '';
  for (genre of genres) {
    generos.textContent += `${genre.name} `;
  }
  
 
  
}





  
modal.addEventListener('click', function (){
  modal.style.display = 'none';
})

const teste = document.querySelectorAll('.movie');
console.log(teste);


next.addEventListener('click',function() {
  movies.innerHTML = '';
const totalPaginas = filmesArray.length;

if ( i + 1 >= totalPaginas) {
  i = 0;
  } else {
  i++;
}
   console.log(i);
   console.log("clicou");
   popularFilmes(i);

 })  

 prev.addEventListener('click',function() {
   movies.innerHTML = ''; 
  const totalPaginas = filmesArray.length;
  if ( i <= 0) {
    i = totalPaginas -1;
  } else {
    i--;
  }
  console.log(i);
   console.log("clicou");
   popularFilmes(i);
 })  