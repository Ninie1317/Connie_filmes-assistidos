// Lista que guarda os filmes (simula banco de dados local)
let filmes = [];

// Referências do DOM
const form = document.getElementById('formFilme');
const listaFilmes = document.getElementById('listaFilmes');

// Função para renderizar os filmes na tela
function renderizarFilmes() {
  listaFilmes.innerHTML = ''; // Limpa a lista antes de renderizar

  filmes.forEach((filme, index) => {
    const filmeDiv = document.createElement('div');
    filmeDiv.classList.add('filme');
    if (filme.assistido) {
      filmeDiv.classList.add('assistido');
    }

    filmeDiv.innerHTML = `
      <h3>${filme.nome}</h3>
      <p><strong>Gênero:</strong> ${filme.genero}</p>
      <p><strong>Duração:</strong> ${filme.duracao} min</p>
      <div>
        <button class="btn-assistido">${filme.assistido ? 'Marcar como Não Assistido' : 'Marcar como Assistido'}</button>
        <button class="btn-excluir">Excluir</button>
      </div>
    `;

    // Botão alterar status assistido
    filmeDiv.querySelector('.btn-assistido').addEventListener('click', () => {
      filmes[index].assistido = !filmes[index].assistido;
      renderizarFilmes();
    });

    // Botão excluir
    filmeDiv.querySelector('.btn-excluir').addEventListener('click', () => {
      filmes.splice(index, 1);
      renderizarFilmes();
    });

    listaFilmes.appendChild(filmeDiv);
  });
}

// Quando o formulário for enviado
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const genero = form.genero.value.trim();
  const duracao = parseInt(form.duracao.value.trim());
  const assistido = form.assistido.value === '1';

  if (nome && genero && duracao > 0) {
    filmes.push({ nome, genero, duracao, assistido });

    form.reset();  // Limpa o formulário
    renderizarFilmes();  // Atualiza a lista
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
});

// Renderiza a lista inicialmente vazia
renderizarFilmes();
