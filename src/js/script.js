class Cachorro {
  constructor(nome, raca, idade, disponivel, descricao = "", imagem = "") {
    this.nome       = nome;
    this.raca       = raca;
    this.idade      = idade;
    this.disponivel = disponivel;
    this.descricao  = descricao;
    this.imagem = imagem
  }
}

const dogList = [
  new Cachorro("Bob", "Bulldog", "1 ano e 6 meses", true, "Muito dócil e brincalhão."),
  new Cachorro("Lila", "Pitbull", "6 meses", true, "Adora correr no parque."),
  new Cachorro("Thor", "Golden Retriever", "2 anos", true, "Se dá bem com outros animais."),
  new Cachorro("Mel", "Poodle", "3 anos", false, "Já foi adotada."),
  new Cachorro("Pingo", "Vira-Lata (SRD)", "5 anos", true, "Calmo e companheiro."),
  new Cachorro("Luna", "Shih Tzu", "4 anos", true, "Ideal para apartamentos."),
  new Cachorro("Pipoca", "Beagle", "1 ano", false, "Em processo de adoção."),
  new Cachorro("Caramelo", "Vira-Lata (SRD)", "2 anos e 3 meses", true, "Muito enérgico."),
  new Cachorro("Max", "Pastor Alemão", "4 anos", true, "Excelente cão de guarda."),
  new Cachorro("Bella", "Dachshund", "8 meses", true, "Pequena e carinhosa.")
];

const containerHome = document.querySelector('#home');

function criarCardCachorro(cachorro) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 mb-4';

  const statusTexto = cachorro.disponivel ? "Disponível para Adoção" : "Indisponível";
  const statusClasse = cachorro.disponivel ? "text-success" : "text-danger";

  const card = document.createElement('article');
  card.className = 'card-Cachorro card h-100 shadow-sm';
  card.innerHTML = `
  <img src="${cachorro.imagem}" class="card-img-top object-fit-cover" alt="Foto de ${cachorro.nome}" style="height: 200px;">
    <div class="card-body">
      <h5 class="card-title fw-bold">${cachorro.nome}</h5>
      <p class="card-text text-muted mb-1"><strong>Raça:</strong> ${cachorro.raca}</p>
      <p class="card-text text-muted mb-2"><strong>Idade:</strong> ${cachorro.idade}</p>
      <p class="card-text fs-6 fw-bold ${statusClasse}">${statusTexto}</p>
    </div>
    <div class="card-footer bg-transparent border-top-0 pb-3">
      <button class="btn btn-lilas w-100"
        data-bs-toggle="modal"
        data-bs-target="#modalCachorro"
        data-nome="${cachorro.nome}"
        data-raca="${cachorro.raca}"
        data-idade="${cachorro.idade}"
        data-disponivel="${statusTexto}"
        data-descricao="${cachorro.descricao}"
        data-imagem="${cachorro.imagem}"> Ver detalhes </button>
    </div>
  `;

  col.appendChild(card);
  return col;
}

function renderizarHome() {
  if (!containerHome) return;
  containerHome.innerHTML = '';
  
  dogList.forEach(cachorro => {
    containerHome.appendChild(criarCardCachorro(cachorro));
  });
}

// Inicializa a renderização dos cards
renderizarHome();

const modalCachorro = document.getElementById('modalCachorro');

modalCachorro.addEventListener('show.bs.modal', (event) => {
  // Botão que acionou o modal
  const button = event.relatedTarget;

  // Captura dos dados informados no botão
  const nome = button.getAttribute('data-nome');
  const raca = button.getAttribute('data-raca');
  const idade = button.getAttribute('data-idade');
  const disponivel = button.getAttribute('data-disponivel');
  const descricao = button.getAttribute('data-descricao');
  const imagem = button.getAttribute('data-imagem')

  // Seleção dos elementos internos do modal
  const modalNome = modalCachorro.querySelector('#modalNome');
  const modalRaca = modalCachorro.querySelector('#modalRaca');
  const modalDisponivel = modalCachorro.querySelector('#modalDisponivel');
  const modalImagem = modalCachorro.querySelector('#modalImagem');
  const btnAdotar = modalCachorro.querySelector('.modal-footer button');

  // Atualização dos textos
  modalNome.textContent = nome;
  modalRaca.textContent = `Raça: ${raca} • Idade: ${idade} ${descricao ? '— ' + descricao : ''}`;
  modalDisponivel.textContent = disponivel;

  // Alterna a cor do status e ativa/desativa o botão de adoção
  if (disponivel === "Disponível para Adoção") {
    modalDisponivel.className = "fs-5 fw-bold text-success";
    btnAdotar.disabled = false;
    btnAdotar.textContent = "Adotar Agora";
  } else {
    modalDisponivel.className = "fs-5 fw-bold text-danger";
    btnAdotar.disabled = true;
    btnAdotar.textContent = "Indisponível";
  }

  if (modalImagem) {
      modalImagem.src = imagem;
      modalImagem.alt = `Foto de ${nome}`;
    }
});

const btnAdotar = document.querySelector('#btnAdotar')

btnAdotar.addEventListener('click', () => {
    const nomePet = document.getElementById('modalNome').textContent;

    // Feedback de confirmação
    alert(`🎉 Parabéns! Registramos seu interesse em adotar o(a) ${nomePet}.\nNossa equipe entrará em contato em breve!`);

    // Fecha o modal via Bootstrap JS
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('modalCachorro'));
    if (modalInstance) {
        modalInstance.hide();
    }
});