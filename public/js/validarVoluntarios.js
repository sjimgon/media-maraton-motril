document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-voluntariado");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    const camposObligatorios = [
      "nombre",
      "apellido",
      "dni",
      "fechaNacimiento",
      "domicilio",
      "poblacion",
      "codigoPostal",
      "provincia",
      "telefonoMovil",
      "email",
      "talla",
      "preferenciaPuesto",
    ];

    for (const campo of camposObligatorios) {
      const input = form.querySelector(`[name="${campo}"]`);
      if (!input || !input.value.trim()) {
        alert(`El campo "${campo}" es obligatorio.`);
        input.focus();
        e.preventDefault();
        return;
      }
    }

    const dniInput = form.querySelector('[name="dni"]');
    const dniRegex = /^\d{8}[A-Z]$/;
    if (!dniRegex.test(dniInput.value)) {
      alert("El DNI debe tener 8 dígitos seguidos de una letra mayúscula.");
      dniInput.focus();
      e.preventDefault();
      return;
    }


    const fechaNacimientoInput = form.querySelector('[name="fechaNacimiento"]');
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    if (isNaN(fechaNacimiento.getTime()) || edad < 18) {
      alert("Debe ser mayor de 18 años para participar como voluntario.");
      fechaNacimientoInput.focus();
      e.preventDefault();
      return;
    }


    const telefonoMovilInput = form.querySelector('[name="telefonoMovil"]');
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefonoMovilInput.value)) {
      alert("El teléfono móvil debe tener 9 dígitos.");
      telefonoMovilInput.focus();
      e.preventDefault();
      return;
    }


    const emailInput = form.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("El email no es válido.");
      emailInput.focus();
      e.preventDefault();
      return;
    }


    const aceptaPolitica = form.querySelector('[name="politica"]:checked');
    if (!aceptaPolitica || aceptaPolitica.value !== "si") {
      alert("Debe aceptar la política de protección de datos para continuar.");
      e.preventDefault();
      return;
    }

    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    fetch("/api/enviarVoluntario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al enviar los datos del voluntario.");
        }
        return respuesta.json();
      })
      .then((data) => {
        alert("Formulario enviado correctamente.");
        grecaptcha.reset(); // Reinicia el reCAPTCHA para permitir nuevos envíos

        form.reset(); // Resetea el formulario después de enviar
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un problema al enviar el formulario. Inténtelo más tarde.");
      });

    e.preventDefault(); // Evita el envío del formulario hasta que se validen todos los campos
  });
});
