import nodemailer from 'nodemailer';

export const prerender = false;

export async function POST({ request }) {
    try {
        const { nombre, email, mensaje } = await request.json();

        if (!nombre || !email || !mensaje) {
            return new Response(JSON.stringify({ error: "Todos los campos son obligatorios." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "webmediamaratonmotril@gmail.com",
                pass: import.meta.env.GMAIL_PASSWORD_MMM,
            },
        });

        const mailOptions = {
            from: '"Consulta de Dudas o Sugerencias" <webmediamaratonmotril@gmail.com>',
            to: "Voluntariosareadeportes@motril.es",
            subject: `Nuevo mensaje de ${nombre}`,
            text: `
El usuario ${nombre} ha enviado un mensaje:

${mensaje}

Puedes responder a este mensaje directamente a través del correo electrónico: ${email}
      `,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ mensaje: "Mensaje enviado correctamente." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error al enviar mensaje de contacto:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
