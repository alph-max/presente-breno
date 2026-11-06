const intro = document.querySelector("#intro");
const openBookButton = document.querySelector("#openBook");
const reader = document.querySelector("#reader");
const leftContent = document.querySelector("#leftContent");
const rightContent = document.querySelector("#rightContent");
const leftPage = document.querySelector("#leftPage");
const rightPage = document.querySelector("#rightPage");
const spread = document.querySelector("#bookSpread");
const prevButton = document.querySelector("#prevPage");
const nextButton = document.querySelector("#nextPage");
const pageCount = document.querySelector("#pageCount");
const closeButton = document.querySelector("#closeBook");

const pages = [
  {
    kicker: "PRÓLOGO",
    title: "Toda jornada começa",
    symbol: "✧",
    paragraphs: [
      { text: "Há histórias que encontramos por acaso. Outras chegam até nós pelas mãos de alguém que, sem perceber, muda a maneira como enxergamos o mundo.", className: "quote" },
      { text: "Esta pequena jornada é uma lembrança de amizade, gratidão e de todas as boas histórias que ainda estão por vir." }
    ]
  },
  {
    kicker: "UM CAMINHO DE FÉ",
    title: "A luz que nos guia",
    symbol: "✦",
    paragraphs: [
      { text: "Antes de qualquer caminho, que esteja sempre Aquele que é o Caminho: Jesus Cristo.", className: "quote" },
      { text: "Que Deus ilumine teus passos, fortaleça teu coração e te conceda sabedoria para cada nova etapa. Que nunca faltem fé, esperança e motivos para agradecer." },
      { text: "J. R. R. Tolkien era católico, e sua fé marcou profundamente sua visão de mundo e sua obra. Talvez por isso, em meio a tantas jornadas, também encontremos ecos de esperança, misericórdia e providência." }
    ]
  },
  {
    kicker: "UM RETRATO DO VIAJANTE",
    title: "Breno, o curioso",
    symbol: "❧",
    paragraphs: [
      { text: "Entre livros, perguntas e descobertas, há sempre um mundo esperando para ser conhecido.", className: "quote" },
      { text: "Com seu jeito mais reservado, seu olhar atento por trás dos óculos e essa curiosidade por tudo o que envolve a vida, a Terra e suas transformações, você segue reunindo conhecimento à sua maneira." },
      { text: "Que nunca perca essa vontade de investigar, aprender e descobrir o que existe além da próxima página." }
    ]
  },
  {
    kicker: "SOBRE AMIZADE",
    title: "Companheiros de jornada",
    symbol: "✧",
    paragraphs: [
      { text: "Nem toda amizade precisa de grandes discursos. Às vezes, ela se revela nos gestos simples, nas conversas, nos livros compartilhados e na presença.", className: "quote" },
      { text: "Você teve uma participação especial em uma descoberta minha: o gosto pela leitura. Ao me apresentar esse universo, acabou me mostrando que existem mundos inteiros esperando por quem se dispõe a abrir um livro." },
      { text: "Por isso, esta lembrança também é uma forma de dizer: obrigado." }
    ]
  },
  {
    kicker: "UMA NOVA PRIMAVERA",
    title: "Dezessete anos",
    symbol: "✦",
    paragraphs: [
      { text: "Que este novo capítulo seja repleto de descobertas, boas companhias, conhecimento e momentos que mereçam ser guardados.", className: "quote" },
      { text: "Que você tenha coragem para explorar novos caminhos, paciência para atravessar os difíceis e sabedoria para reconhecer as pequenas alegrias pelo caminho." }
    ]
  },
  {
    kicker: "FIM DESTA PEQUENA JORNADA",
    title: "Feliz aniversário!",
    symbol: "❧",
    paragraphs: [
      { text: "Que a sua história continue sendo escrita com fé, amizade e esperança.", className: "quote" },
      { text: "Feliz 17 anos, Breno! Que Deus abençoe sua vida hoje e sempre.", className: "" },
      { text: "Com carinho e amizade,", className: "small" },
      { text: "um companheiro de jornada.", className: "small" }
    ]
  }
];

let spreadIndex = 0;
const isMobile = () => window.matchMedia("(max-width: 650px)").matches;
const totalPages = pages.length;

function renderPage(page, number) {
  const paragraphs = page.paragraphs.map(item =>
    `<p${item.className ? ` class="${item.className}"` : ""}>${item.text}</p>`
  ).join("");

  return `
    <div class="ornament">${page.symbol}</div>
    <p class="kicker">${page.kicker}</p>
    <h2>${page.title}</h2>
    ${paragraphs}
    <span class="page-number">${String(number).padStart(2, "0")}</span>
  `;
}

function renderSpread() {
  const mobile = isMobile();
  const leftIndex = spreadIndex;
  const rightIndex = spreadIndex + 1;

  if (mobile) {
    leftContent.innerHTML = "";
    rightContent.innerHTML = renderPage(pages[leftIndex], leftIndex + 1);
    leftPage.style.display = "none";
    rightPage.style.display = "block";
    pageCount.textContent = `${leftIndex + 1} / ${totalPages}`;
    prevButton.textContent = "← Anterior";
    nextButton.textContent = "Próxima →";
    prevButton.disabled = leftIndex === 0;
    nextButton.disabled = leftIndex >= totalPages - 1;
  } else {
    leftPage.style.display = "block";
    rightPage.style.display = "block";
    leftContent.innerHTML = renderPage(pages[leftIndex], leftIndex + 1);
    if (rightIndex < totalPages) {
      rightContent.innerHTML = renderPage(pages[rightIndex], rightIndex + 1);
    } else {
      rightContent.innerHTML = `<div class="ornament">✧</div><p class="kicker">ATÉ A PRÓXIMA HISTÓRIA</p><h2>O caminho continua</h2><p class="quote">Toda boa jornada deixa lembranças. Que esta seja uma delas.</p><span class="page-number">—</span>`;
    }
    pageCount.textContent = `${leftIndex + 1}–${Math.min(rightIndex, totalPages)} / ${totalPages}`;
    prevButton.textContent = "← Anterior";
    nextButton.textContent = "Próximas páginas →";
    prevButton.disabled = leftIndex === 0;
    nextButton.disabled = leftIndex >= totalPages - 2;
  }
}

function turnPage(direction) {
  const step = isMobile() ? 1 : 2;
  const nextIndex = spreadIndex + direction * step;
  const maxIndex = isMobile() ? totalPages - 1 : totalPages - 2;
  spreadIndex = Math.max(0, Math.min(nextIndex, maxIndex));
  spread.classList.remove("turning");
  void spread.offsetWidth;
  spread.classList.add("turning");
  renderSpread();
}

openBookButton.addEventListener("click", () => {
  // A tentativa de reprodução acontece no clique do visitante,
  // o que costuma ser aceito pelos navegadores móveis.
  startBackgroundMusic();

  document.body.classList.add("is-opening");
  window.setTimeout(() => {
    intro.classList.add("hidden");
    reader.classList.remove("hidden");
    document.body.classList.remove("is-opening");
    spreadIndex = 0;
    renderSpread();
  }, 650);
});

prevButton.addEventListener("click", () => turnPage(-1));
nextButton.addEventListener("click", () => turnPage(1));
window.addEventListener("resize", () => {
  if (!reader.classList.contains("hidden")) {
    spreadIndex = isMobile() ? Math.min(spreadIndex, totalPages - 1) : Math.min(spreadIndex, totalPages - 2);
    renderSpread();
  }
});

closeButton.addEventListener("click", () => {
  reader.classList.add("hidden");
  intro.classList.remove("hidden");
  intro.style.animation = "none";
  requestAnimationFrame(() => { intro.style.animation = ""; });
});

const musicButton = document.querySelector("#musicToggle");
const musicLabel = document.querySelector("#musicLabel");
const music = document.querySelector("#backgroundMusic");
const musicHint = document.querySelector("#musicHint");

async function startBackgroundMusic() {
  try {
    await music.play();
    musicButton.setAttribute("aria-pressed", "true");
    musicLabel.textContent = "Pausar música";
    musicHint.textContent = "Trilha sonora ativada.";
  } catch {
    // Se o navegador bloquear ou o MP3 estiver ausente,
    // o visitante ainda pode tentar pelo botão de música.
    musicHint.textContent = "Se a música não começar, toque em Ativar música.";
  }
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pausar música";
      musicHint.textContent = "Trilha sonora ativada.";
    } catch {
      musicHint.textContent = "Não encontrei a trilha. Adicione trilha.mp3 em assets/musica.";
    }
  } else {
    music.pause();
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Ativar música";
    musicHint.textContent = "Trilha sonora pausada.";
  }
});
music.addEventListener("error", () => {
  musicHint.textContent = "Para usar música, adicione um MP3 chamado trilha.mp3 em assets/musica.";
});
