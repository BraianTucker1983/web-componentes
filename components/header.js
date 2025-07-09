function headerComponent(el) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <header class="header-main">
      <div class="header__conteiner-img">
        <a href="index.html">
          <img class="header__img" src="logo-desafio.png" alt="">
        </a> 
      </div>
      <div class="header__menu-burger">
          <div class="header__menu-burger-line"></div>
          <div class="header__menu-burger-line"></div>
          <div class="header__menu-burger-line"></div>
      </div>      
      <div class="header__menu-list" style="display: none;">
          <div class="header__menu-close">X</div>
          <a class="menu-list" href="portfolio.html">Portfolio</a>
          <a class="menu-list" href="servicios.html">Servicio</a>
          <a class="menu-list" href="contacto.html">Contacto</a>
      </div>
      <div class="header__menu-links">          
          <a class="menu-list" href="portfolio.html">Portfolio</a>
          <a class="menu-list" href="servicios.html">Servicio</a>
          <a class="menu-list" href="contacto.html">Contacto</a>
      </div>
    </header>`;

  el.appendChild(componentEl);

  const botonAbrir = componentEl.querySelector('.header__menu-burger');
  const botonCerrar = componentEl.querySelector('.header__menu-close');
  const ventana = componentEl.querySelector('.header__menu-list');

  botonAbrir.addEventListener('click', function () {
    ventana.style.display = "flex";
  });

  botonCerrar.addEventListener('click', function () {
    ventana.style.display = "none";
  });
}

function main() {
  headerComponent(document.querySelector('.header'));  
}

main();