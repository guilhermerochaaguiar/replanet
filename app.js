document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.15) return;

  const particula = document.createElement('div');
  particula.classList.add('particula-eco');

  const tamanho = Math.random() * 8 + 6;

  particula.style.width = `${tamanho}px`;
  particula.style.height = `${tamanho}px`;

  particula.style.left = `${e.clientX}px`;
  particula.style.top = `${e.clientY}px`;

  const cores = ['#4a7c59', '#689f78', '#e28743'];

  particula.style.background =
    cores[Math.floor(Math.random() * cores.length)];

  document.body.appendChild(particula);

  requestAnimationFrame(() => {
    const deslocamentoX = (Math.random() - 0.5) * 60;
    const deslocamentoY = (Math.random() - 0.5) * 60;

    particula.style.transform =
      `translate(${deslocamentoX}px, ${deslocamentoY}px) scale(0) rotate(${Math.random() * 360}deg)`;

    particula.style.opacity = '0';
  });

  setTimeout(() => {
    particula.remove();
  }, 1200);
});

const imagemHero = document.querySelector('.hero-imagem img');

if (imagemHero) {
  const containerHero = document.querySelector('.hero');

  containerHero.addEventListener('mousemove', (e) => {

    const larguraBox =
      containerHero.getBoundingClientRect().width;

    const alturaBox =
      containerHero.getBoundingClientRect().height;

    const mouseX =
      e.clientX -
      containerHero.getBoundingClientRect().left -
      (larguraBox / 2);

    const mouseY =
      e.clientY -
      containerHero.getBoundingClientRect().top -
      (alturaBox / 2);

    const inclinacaoX = (mouseY / alturaBox) * -15;
    const inclinacaoY = (mouseX / larguraBox) * 15;

    imagemHero.style.transform =
      `rotateX(${inclinacaoX}deg) rotateY(${inclinacaoY}deg) scale(1.03)`;

    imagemHero.style.transition = 'transform 0.1s ease';
  });

  containerHero.addEventListener('mouseleave', () => {

    imagemHero.style.transform =
      'rotateX(0deg) rotateY(0deg) scale(1)';

    imagemHero.style.transition =
      'transform 0.5s ease';
  });
}

const botaoDark = document.getElementById('darkmode');

if (localStorage.getItem('tema') === 'dark') {

  document.body.classList.add('darkmode');

  if (botaoDark) {
    botaoDark.textContent = 'Modo claro';
  }
}

if (botaoDark) {

  botaoDark.addEventListener('click', () => {

    document.body.classList.toggle('darkmode');

    const darkAtivo =
      document.body.classList.contains('darkmode');

    if (darkAtivo) {

      localStorage.setItem('tema', 'dark');

      botaoDark.textContent = 'Modo claro';
    }

    else {

      localStorage.setItem('tema', 'light');

      botaoDark.textContent = 'Modo escuro';
    }
  });
}

const perguntas =
  document.querySelectorAll('input[type="radio"]');

const progressoBarra =
  document.getElementById("progressobar");

const progressoTexto =
  document.getElementById("progresso-texto");

const resultado =
  document.getElementById("resultado");

const botaoFinalizar =
  document.getElementById("finalizarquiz");

if (perguntas.length > 0) {

  perguntas.forEach((pergunta) => {
    pergunta.addEventListener(
      "change",
      atualizarProgresso
    );
  });
}

function atualizarProgresso() {

  let respondidas = 0;

  for (let i = 1; i <= 10; i++) {

    const marcada =
      document.querySelector(
        `input[name="p${i}"]:checked`
      );

    if (marcada) {
      respondidas++;
    }
  }

  const porcentagem =
    (respondidas / 10) * 100;

  if (progressoBarra) {
    progressoBarra.style.width =
      porcentagem + "%";
  }

  if (progressoTexto) {

    progressoTexto.innerText =
      `${respondidas} de 10 perguntas respondidas`;
  }
}

if (botaoFinalizar) {

  botaoFinalizar.addEventListener("click", () => {

    let pontos = 0;

    for (let i = 1; i <= 10; i++) {

      const resposta =
        document.querySelector(
          `input[name="p${i}"]:checked`
        );

      if (!resposta) {

        alert(
          "Responda todas as perguntas antes de finalizar."
        );

        return;
      }

      pontos += Number(resposta.value);
    }

    let titulo = "";
    let mensagem = "";

    if (pontos >= 23) {

      titulo = "Consumidor Consciente!";

      mensagem =
        "Você estende a vida útil dos aparelhos e sabe descartar corretamente o lixo eletrônico. Excelente!";
    }

    else if (pontos >= 13) {

      titulo = "Acumulador Bem-Intencionado!";

      mensagem =
        "Você se preocupa com o meio ambiente, mas ainda acumula eletrônicos ou deixa o descarte para depois.";
    }

    else {

      titulo = "Pegada Digital Crítica!";

      mensagem =
        "Seus hábitos geram bastante impacto ambiental. Pequenas mudanças já podem fazer muita diferença.";
    }

    resultado.style.display = "block";

    resultado.innerHTML = `
      <h2>${titulo}</h2>
      <h3>${pontos} de 30 pontos</h3>
      <p>${mensagem}</p>
    `;

    resultado.scrollIntoView({
      behavior: "smooth"
    });
  });
}