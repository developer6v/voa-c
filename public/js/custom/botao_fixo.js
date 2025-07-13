document.addEventListener("DOMContentLoaded", () => {
  const botaoFixo = document.getElementById("botao-fixo");
  const rodape = document.querySelector("footer"); // ou use o ID do seu footer se tiver

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const rodapeTop = rodape.offsetTop;

    // Exibe se passou de 200px E ainda não chegou no rodapé
    if (scrollY > 200 && scrollY + windowHeight < rodapeTop) {
      botaoFixo.classList.add("show");
    } else {
      botaoFixo.classList.remove("show");
    }
  });
});
