function footerComponent(el) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <footer class="footer_container">
  <img src="logo-desafio.png" class="footer_logo">
  <div class="footer_links">
      <a href="index.html" class="footer_home"><i class="fas fa-home">Home</i></a>
      <a href="servicios.html" class="footer_services"><i class="fas fa-user"></i>Servicios</a>
      <a href="contacto.html" class="footer_contact"><i class="fas fa-phone"></i>Contacto</a>
  </div>
  <div class="footer_social-links">
    <img src="logo-linkedin.jpg" class="footer_logo-linkedin">
    <img src="logo-github.png" class="footer_logo-github">
    <img src="logo-twitter.png" class="footer_logo-twitter">
  </div>
  <p class="footer_text">©2025 - https://apx.school</p>
 </footer>`;

  el.appendChild(componentEl);
}

function main() {
  footerComponent(document.querySelector('.footer'));
}

main();