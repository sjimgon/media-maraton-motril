import * as XLSX from "xlsx";
import nodemailer from "nodemailer";

export const prerender = false;

export async function POST({ request }) {
  try {
    const datos = await request.json();
    const camposObligatorios = [
      "nombre",
      "apellido",
      "dni",
      "fechaNacimiento",
      "email"
    ];

    for (const campo of camposObligatorios) {
      if (!datos[campo] || datos[campo].trim() === "") {
        return new Response(
          JSON.stringify({ error: `Falta el campo obligatorio: ${campo}` }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }


    const fechaOriginal = new Date(datos.fechaNacimiento);
    datos.fechaNacimiento = fechaOriginal.toLocaleDateString("es-ES").toString();


    const hojaExcel = XLSX.utils.json_to_sheet([datos]);
    const libroExcel = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroExcel, hojaExcel, "Voluntarios");

    const buffer = XLSX.write(libroExcel, {
      bookType: "xlsx",
      type: "buffer"
    });
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "webmediamaratonmotril@gmail.com",
          pass: import.meta.env.GMAIL_PASSWORD_MMM
        }
      });

      const asunto = `Nuevo Voluntario: ${datos.nombre} ${datos.apellido}`;
      const mailOptions = {
        from: '"Formulario Voluntariado" <webmediamaratonmotril@gmail.com>',
        to: "Voluntariosareadeportes@motril.es", 
        subject: asunto,
        text: "Una nueva persona ha solicitado unirse al equipo de voluntarios. En el archivo adjunto encontrarás los datos aportados por el usuario.",
        attachments: [
          {
            filename: "voluntario.xlsx",
            content: buffer,
            contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
        ]
      };

      await transporter.sendMail(mailOptions);


    return new Response(
      JSON.stringify({ mensaje: "Datos recibidos correctamente." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
  console.error("ERROR en el backend:", error.message);
  return new Response(
    JSON.stringify({ error: "Error interno del servidor." }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}

}
