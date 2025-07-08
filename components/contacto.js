function contactComponent(el) {
  const componentEl = document.createElement("div");
  componentEl.innerHTML = `
    <section class="contactme_section">
      <h2 class="contactme_title">Escribime</h2>
      <form class="contactme_form">
        <div class="contactme_name-mail">
          <label class="contactme_name">
            <div>Nombre</div>
            <input name="nombre" type="text" class="contactme_name-input" required>
          </label>
          <label class="contactme_mail">
            <div>Email</div>
            <input name="email" type="email" class="contactme_mail-input" required>
          </label>
        </div>
        <label>
          <div>Mensaje</div>
          <textarea name="mensaje" class="contactme_textarea" required></textarea>
        </label>
        <div>
          <button class="contactme_button" type="submit">Enviar <i class="fas fa-paper-plane"></i></button>
        </div>
      </form>
    </section>
  `;

  el.appendChild(componentEl);

  const form = componentEl.querySelector(".contactme_form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = new FormData(form);
    const datosCompletos = Object.fromEntries(datos.entries());

    const mensajeFinal = `
Nombre: ${datosCompletos.nombre}
Email: ${datosCompletos.email}
Mensaje: ${datosCompletos.mensaje}
    `;

    fetch("https://apx.school/api/utils/email-to-student", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        to: "braiantucker@gmail.com", 
        message: mensajeFinal,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Pronto me voy a poner en contacto. Gracias!");
          form.reset();
        } else {
          alert("Algo fallo. Por favor, revisa tus datos.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un problema.");
      });
  });
}


function main() {
  contactComponent(document.querySelector('.contactme'));
}

main();
