// =====================
// Lógica principal do jogo Termo DS
// =====================

// Palavras e dicas
const secretWords = [
{ word: "SECAS", hint: "Falta de água por longos períodos." },
  { word: "CLIMA", hint: "Conjunto de condições atmosféricas." },
  { word: "DANOS", hint: "Consequências negativas de eventos extremos." },
  { word: "SECAR", hint: "Ato de perder água." },
  { word: "CRISE", hint: "Situação de emergência hídrica." },
  { word: "CHUVA", hint: "Precipitação de água do céu." },
  { word: "GOTAS", hint: "Pequenas porções de líquido." },
  { word: "SOLAR", hint: "Relacionado ao Sol." },
  { word: "BOMBA", hint: "Explosivo ou algo que lança ar." },
  { word: "FELIZ", hint: "Quando estamos contentes." },
  { word: "NORTE", hint: "Um dos pontos cardeais." },
  { word: "MELAR", hint: "Deixar algo sujo ou manchado." },
  { word: "LIVRO", hint: "Objeto para ler." },
  { word: "FLOTA", hint: "Conjunto de barcos ou navios." },
  { word: "RUÍDO", hint: "Som alto ou desagradável." },
  { word: "DENTE", hint: "Parte dura na boca usada para mastigar." },
  { word: "MUNDO", hint: "Planeta onde vivemos." },
  { word: "FALAR", hint: "Expressar palavras." },
  { word: "PESCA", hint: "Ato de pegar peixes." },
  { word: "GENTE", hint: "Pessoas em geral." },
  { word: "PLANO", hint: "Algo organizado ou sem relevo." },
  { word: "SONHO", hint: "Imagens que vemos enquanto dormimos." },
  { word: "VIVER", hint: "Estar vivo; existir." },
  { word: "FUGIR", hint: "Sair correndo para escapar." },
  { word: "CHAVE", hint: "Usada para abrir portas." },
  { word: "FAROL", hint: "Luz usada para sinalizar." },
  { word: "TRIGO", hint: "Grão usado para fazer pão." },
  { word: "COISA", hint: "Objeto qualquer, sem especificar." },
  { word: "PUNHO", hint: "Parte da mão usada para dar soco." },
  { word: "CANTO", hint: "Parte de um lugar, ou música curta." },
  { word: "RIRAM", hint: "Passado do verbo rir." },
  { word: "JUNTO", hint: "Perto, ao lado." },
  { word: "LEITE", hint: "Bebida branca de vaca." },
  { word: "DANÇA", hint: "Movimento do corpo ao som de música." },
  { word: "AMIGO", hint: "Pessoa com quem temos amizade." },
  { word: "BONUS", hint: "Recompensa extra." },
  { word: "MEXER", hint: "Movimentar algo com as mãos." },
  { word: "PENTE", hint: "Usado para arrumar o cabelo." },
  { word: "PLENO", hint: "Totalmente cheio ou completo." },
  { word: "NUTRE", hint: "Alimenta ou cuida da saúde." },
  { word: "JOGAR", hint: "Atividade de esporte ou diversão." },
  { word: "MOVER", hint: "Fazer algo se deslocar." },
  { word: "VIDRO", hint: "Material transparente, usado em janelas." },
  { word: "GOLFE", hint: "Jogo que utiliza uma pequena bola e taco." },
  { word: "PRAIA", hint: "Área de terra perto do mar." },
  { word: "GOSTO", hint: "Sensação no paladar." },
  { word: "LIMBO", hint: "Estado intermediário, entre duas fases." },
  { word: "PEIXE", hint: "Animal aquático com barbatanas." },
  { word: "SABOR", hint: "Sensação de gosto na boca." },
  { word: "LINHA", hint: "Corda fina ou traço contínuo." },
  { word: "FURAR", hint: "Fazer um buraco em algo." },
  { word: "CORPO", hint: "Parte física de um ser vivo." },
  { word: "FAZER", hint: "Realizar ou executar algo." },
  { word: "LUZES", hint: "Fontes de iluminação." },
  { word: "SERES", hint: "Seres vivos, criaturas." },
  { word: "VIVOS", hint: "Aqueles que têm vida." },
  { word: "ALUNO", hint: "Pessoa que estuda em uma escola." },
  { word: "MARCO", hint: "Ponto de referência importante." },
  { word: "CAIXA", hint: "Objeto para guardar coisas." },
  { word: "TURMA", hint: "Grupo de pessoas." },
  { word: "TROCA", hint: "Ato de substituir algo por outra coisa." },
  { word: "PULGA", hint: "Inseto pequeno que salta." },
  { word: "PEDRA", hint: "Material sólido e durável da natureza." },
  { word: "FOLHA", hint: "Parte verde das plantas." },
  { word: "CAMPO", hint: "Área de terra para cultivo ou esporte." },
  { word: "FESTA", hint: "Evento social com música e comida." },
  { word: "JULHO", hint: "Mês do verão no hemisfério norte." },
  { word: "MOLHO", hint: "Substância líquida usada para temperar." },
  { word: "ALVO", hint: "Objetivo a ser atingido." },
  { word: "PIADA", hint: "História engraçada." },
  { word: "VIRAR", hint: "Alterar a direção." },
  { word: "MORAR", hint: "Viver em um lugar específico." },
  { word: "ABRIL", hint: "Mês do ano." },
  { word: "FENDA", hint: "Abertura ou rachadura." },
  { word: "MESA", hint: "Objeto para apoiar objetos ou refeições." },
  { word: "ALMOÇO", hint: "Refeição do meio-dia." }
];

let secret, lives, gameOver, hintUsed = false, currentHint = "";

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const winScreen = document.getElementById("win-screen");
const guessInput = document.getElementById("guess");
const hintDiv = document.getElementById("hint");
const hintBtn = document.getElementById("hint-btn");

function startGame() {
  const chosen = secretWords[Math.floor(Math.random() * secretWords.length)];
  secret = chosen.word;
  currentHint = chosen.hint;
  hintDiv.textContent = currentHint;
  hintDiv.classList.remove("visible");
  hintUsed = false;
  lives = 5;
  gameOver = false;
  grid.innerHTML = "";
  message.textContent = "";
  winScreen.style.display = "none";
  guessInput.value = "";
  guessInput.disabled = false;
  updateLivesDisplay();
  guessInput.focus();
}

function updateLivesDisplay() {
  livesDisplay.innerHTML = "❤️".repeat(lives) + "🤍".repeat(5 - lives);
  if (lives === 1) {
    livesDisplay.style.color = "#ffc107";
  } else if (lives === 0) {
    livesDisplay.style.color = "#dc3545";
  } else {
    livesDisplay.style.color = "";
  }
}

function createRow(word, colors) {
  const row = document.createElement("div");
  row.style.display = "contents";
  for (let i = 0; i < 5; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", colors[i]);
    cell.textContent = word[i];
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

function checkWord(guess) {
  const colors = Array(5).fill("absent");
  const count = {};

  for (let ch of secret) count[ch] = (count[ch] || 0) + 1;

  for (let i = 0; i < 5; i++) {
    if (guess[i] === secret[i]) {
      colors[i] = "correct";
      count[guess[i]]--;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (colors[i] === "correct") continue;
    if (secret.includes(guess[i]) && count[guess[i]] > 0) {
      colors[i] = "present";
      count[guess[i]]--;
    }
  }

  return colors;
}

function submitGuess() {
  if (gameOver) return;

  const guess = guessInput.value.toUpperCase().trim();

  if (guess.length !== 5 || !/^[A-ZÇÃÕÁÉÍÓÚÂÊÔÀÈÌÒÙÜ]{5}$/.test(guess)) {
    message.textContent = "Digite uma palavra válida de 5 letras.";
    guessInput.classList.add("shake");
    setTimeout(() => guessInput.classList.remove("shake"), 350);
    guessInput.focus();
    return;
  }

  const colors = checkWord(guess);
  createRow(guess, colors);
  guessInput.value = "";

  if (guess === secret) {
    gameOver = true;
    setTimeout(() => {
      winScreen.innerHTML = `
        <div class="trophy"><i class="fa-solid fa-trophy"></i></div>
        <div>🎉 Você acertou a palavra!</div>
        <button onclick="restartGame()"><i class="fa-solid fa-play"></i> Jogar Novamente</button>
      `;
      winScreen.style.display = "flex";
      guessInput.disabled = true;
    }, 400);
  } else {
    lives--;
    updateLivesDisplay();
    message.textContent = `Você errou. Perdeu 1 vida.`;

    if (lives === 0 && !gameOver) {
      setTimeout(() => {
        winScreen.innerHTML = `
          <div class="trophy" style="color:#dc3545;"><i class="fa-solid fa-skull-crossbones"></i></div>
          <div style="margin-bottom:10px;">💧 Você perdeu!<br>A palavra era <b>${secret}</b>.</div>
          <button onclick="restartGame()"><i class="fa-solid fa-play"></i> Jogar Novamente</button>
        `;
        winScreen.style.display = "flex";
        gameOver = true;
        guessInput.disabled = true;
      }, 400);
    }
  }
  guessInput.focus();
}

function restartGame() {
  startGame();
}

guessInput.addEventListener("keyup", e => {
  if (e.key === "Enter") submitGuess();
});

hintBtn.addEventListener("click", () => {
  if (!hintUsed) {
    hintDiv.classList.add("visible");
    hintUsed = true;
  } else {
    hintDiv.classList.toggle("visible");
  }
});

// Partículas do fundo
function particles() {
  const canvas = document.querySelector('.particles');
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;

  let arr = [];
  for (let i = 0; i < 48; i++) {
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 1.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      c: `rgba(${Math.floor(Math.random()*60)},${57+Math.floor(Math.random()*100)},${115+Math.floor(Math.random()*100)},${Math.random()*0.22+0.13})`,
      glow: Math.random() > 0.7
    });
  }

  function draw() {
    ctx.clearRect(0,0,w,h);
    for (let p of arr) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
      ctx.fillStyle = p.c;
      if (p.glow) {
        ctx.shadowColor = "#28a745";
        ctx.shadowBlur = 18;
      }
      ctx.globalAlpha = 0.7 + Math.sin(Date.now()/700 + p.x) * 0.2;
      ctx.fill();
      ctx.restore();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  });
}

particles();
startGame();
