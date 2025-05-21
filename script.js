// Array para armazenar os filmes
let filmes = [];

// Função para adicionar um filme
document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    const duracao = document.getElementById('duracao').value;

    const filme = {
        nome,
        genero,
        duracao,
        assistido: false
    };

    filmes.push(filme);
    renderizarFilmes();
    document.getElementById('movieForm').reset();
});

// Função para renderizar os filmes na tela
function renderizarFilmes() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';  // Limpar a lista antes de renderizar novamente

    filmes.forEach((filme, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.id = `movie${index}`;

        const status = filme.assistido ? 'Assistido' : 'Não assistido';
        const statusClass = filme.assistido ? 'assistido' : '';

        movieCard.innerHTML = `
            <h3>${filme.nome}</h3>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
            <p><strong>Status:</strong> <span class="status">${status}</span></p>
            <button class="${statusClass}" onclick="marcarComoAssistido(${index})">${filme.assistido ? 'Desmarcar como Assistido' : 'Marcar como Assistido'}</button>
        `;

        movieList.appendChild(movieCard);
    });
}

// Função para marcar o filme como assistido
function marcarComoAssistido(index) {
    filmes[index].assistido = !filmes[index].assistido;
    renderizarFilmes();
}

// Função para filtrar os filmes por gênero
function filtrarFilmes() {
    const filtro = document.getElementById('filterGenero').value;

    let filmesFiltrados = filmes;
    
    if (filtro) {
        filmesFiltrados = filmes.filter(filme => filme.genero === filtro);
    }

    // Limpar e renderizar os filmes filtrados
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    filmesFiltrados.forEach((filme, index) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.id = `movie${index}`;

        const status = filme.assistido ? 'Assistido' : 'Não assistido';
        const statusClass = filme.assistido ? 'assistido' : '';

        movieCard.innerHTML = `
            <h3>${filme.nome}</h3>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
            <p><strong>Status:</strong> <span class="status">${status}</span></p>
            <button class="${statusClass}" onclick="marcarComoAssistido(${index})">${filme.assistido ? 'Desmarcar como Assistido' : 'Marcar como Assistido'}</button>
        `;

        movieList.appendChild(movieCard);
    });
}
