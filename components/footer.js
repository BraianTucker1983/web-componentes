function footerComponent(el) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <footer class="footer_container">
  <img src="logo-desafio.png" class="footer_logo">
  <div class="footer_links">
      <a href="web-componentes/index.html" class="footer_home"><i class="fas fa-home">Home</i></a>
      <a href="web-componentes/servicios.html" class="footer_services"><i class="fas fa-user"></i>Servicios</a>
      <a href="web-componentes/contacto.html" class="footer_contact"><i class="fas fa-phone"></i>Contacto</a>
Contacto</a>
  </div>
  <div class="footer_social-links">
    <img src="web-componentes/logo-linkedin.jpg" class="footer_logo-linkedin">
    <img src="web-componentes/logo-github.png" class="footer_logo-github">
    <img src="web-componentes/logo-twitter.png" class="footer_logo-twitter">
  </div>
  <p class="footer_text">©2025 - https://apx.school</p>
 </footer>`;

  el.appendChild(componentEl);
}

function main() {
  footerComponent(document.querySelector('.footer'));
}

main();