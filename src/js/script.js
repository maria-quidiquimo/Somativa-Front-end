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
  new Cachorro("Bob", "Bulldog", "1 ano e 6 meses", true, "Muito dócil e brincalhão.", 'https://i.pinimg.com/1200x/5e/58/01/5e5801dd292b55eb1787bc088ddd51fb.jpg'),
  new Cachorro("Lila", "Pitbull", "6 meses", true, "Adora correr no parque.", 'https://i.pinimg.com/1200x/7f/f4/7f/7ff47f6558f97f50d76660c35ff13900.jpg'),
  new Cachorro("Thor", "Golden Retriever", "2 anos", true, "Se dá bem com outros animais.", 'https://i.pinimg.com/736x/7d/ba/48/7dba484ef4f77f4e73dd23602e67f8b0.jpg'),
  new Cachorro("Mel", "Poodle", "3 anos", false, "Já foi adotada.", ' https://i.pinimg.com/1200x/e5/45/09/e5450930676852620d865429c7d46fe6.jpg'),
  new Cachorro("Pingo", "Vira-Lata (SRD)", "5 anos", true, "Calmo e companheiro.", 'https://i.pinimg.com/736x/5b/78/9b/5b789ba15f4ceb9bd50a685cad8831aa.jpg'),
  new Cachorro("Luna", "Shih Tzu", "4 anos", true, "Ideal para apartamentos.", 'https://i.pinimg.com/736x/7b/35/1f/7b351fa355d1f4e31cd6d1d40ae9721e.jpg'),
  new Cachorro("Pipoca", "Beagle", "1 ano", false, "Em processo de adoção.", 'https://http2.mlstatic.com/D_NQ_NP_625114-MCO92277390884_092025-O.webp'),
  new Cachorro("Caramelo", "Vira-Lata (SRD)", "2 anos e 3 meses", true, "Muito enérgico.", 'https://cdn.folhape.com.br/upload/dn_arquivo/2024/07/shutterstock-1479050870.jpg'),
  new Cachorro("Max", "Pastor Alemão", "4 anos", true, "Excelente cão de guarda.", 'https://blog-static.petlove.com.br/wp-content/uploads/2018/05/pastor-alemao-filhote.jpg'),
  new Cachorro("Bella", "Dachshund", "8 meses", true, "Pequena e carinhosa.", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-611m5n8VbHSXTnTngm0K2e9uFAp70ahGfqYI4jn9bXs3_5Y-JuH4Aos&s=10')
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
  <img src="${cachorro.imagem}" class="card-img-top object-fit-cover" alt="Foto de ${cachorro.nome}" style="height: 500px;">
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