import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const attachmentFile = formData.get('attachment') as File | null;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para 587
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    const mailOptions: any = {
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_TO_EMAIL!,
      subject,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    };

    if (attachmentFile) {
      const buffer = Buffer.from(await attachmentFile.arrayBuffer());
      mailOptions.attachments = [
        {
          filename: attachmentFile.name,
          content: buffer,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
