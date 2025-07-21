document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-sugerencia");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Introduce un correo electrónico válido.");
      form.email.focus();
      return;
    }

    try {
      const respuesta = await fetch("/api/enviarSugerencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "Error al enviar el mensaje.");
      }

      alert("Gracias por tu mensaje. Te responderemos pronto.");
      form.reset();
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      alert("Hubo un problema al enviar tu mensaje. Intenta más tarde.");
    }
  });
});
