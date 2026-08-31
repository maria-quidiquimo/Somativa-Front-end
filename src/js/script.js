<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-grid.min.css"></link>

class Cachorro {
  constructor(nome, raca, idade, disponivel) {
    this.nome       = nome;
    this.raca       = raca;
    this.idade      = idade;
    this.disponivel = disponivel;
  }

  disponivel(disponivel){
    if (this.disponivel === true){
        return 'Esta fofura está esperando um lar 🥹!'
    } else {
        return 'Já foi adotado(a) por uma família ❤️!'
    }
  }
}

const dogList = [
  new Cachorro("Bob", "Bulldog", "1 ano e 6 meses", true),
  new Cachorro("Lila", "Pitbull", "6 meses", true),
  new Cachorro("Thor", "Golden Retriever", "2 anos", true),
  new Cachorro("Mel", "Poodle", "3 anos", false),
  new Cachorro("Pingo", "Vira-Lata (SRD)", "5 anos", true),
  new Cachorro("Luna", "Shih Tzu", "4 anos", true),
  new Cachorro("Pipoca", "Beagle", "1 ano", false),
  new Cachorro("Caramelo", "Vira-Lata (SRD)", "2 anos e 3 meses", true),
  new Cachorro("Max", "Pastor Alemão", "4 anos", true),
  new Cachorro("Bella", "Dachshund", "8 meses", true)
];

const containerHome = document.querySelector('#');

function criarCardCachorro(Cachorro) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';

  const card = document.createElement('article');
  card.className = 'card-Cachorro card h-100';

  /*
    LIVE CODE — PASSO 2:
    Trocar o innerHTML abaixo pelo componente Bootstrap:
  */
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title fw-bold">${Cachorro.nome}</h5>
        <p class="card-text text-muted">${Cachorro.disponivel}</p>
        <p class="card-text fs-5 fw-bold text-success">${Cachorro.disponivel()}</p>
      </div>
      <div class="card-footer bg-transparent border-top-0 pb-3">
        <button class="btn btn-danger w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalCachorro"
                data-nome="${Cachorro.nome}"
                data-disponivel="${Cachorro.disponivel}"
                data-preco="${Cachorro.formatarPreco()}"
                data-descricao="${Cachorro.descricao}">
          Ver detalhes
        </button>
      </div>
    `;
  
  // card.innerHTML = `
  //   <div class="card-body">
  //     <h3 class="card-title">${Cachorro.nome}</h3>
  //     <span class="card-text">${Cachorro.disponivel}</span>
  //     <div class="card-footer">${Cachorro.formatarPreco()}</div>
  //   </div>
  // `;

  col.appendChild(card);
  return col;
}

function renderizarCardapio() {
  containerCardapio.innerHTML = '';
  cardapio.forEach(Cachorro => {
    containerCardapio.appendChild(criarCardCachorro(Cachorro));
  });
}

renderizarCardapio();

/*
  LIVE CODE — PASSO 4 (Modal):
  Depois de adicionar o modal no HTML, conectar os botões:
*/
  document.addEventListener('show.bs.modal', (event) => {
    const btn    = event.relatedTarget;
    const nome   = btn.getAttribute('data-nome');
    const cat    = btn.getAttribute('data-disponivel');
    const preco  = btn.getAttribute('data-preco');
    const desc   = btn.getAttribute('data-descricao');

    document.getElementById('modalNome').textContent      = nome;
    document.getElementById('modaldisponivel').textContent = cat;
    document.getElementById('modalPreco').textContent     = preco;
    document.getElementById('modalDescricao').textContent = desc;
  });
