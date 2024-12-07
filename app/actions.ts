'use server'
import { Resend } from 'resend';
import EmailTemplate from './components/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(fd: FormData) {
    const formData = Object.fromEntries(fd);
    if (!formData["name"] || !formData["email"] || !formData["number"] || !formData["insurance"]) {
        return
    }
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: 'veronica@getg2insurance.com',
        subject: 'New Contact Form Submission',
        react: EmailTemplate({
            name: formData["name"].toString(),
            email: formData["email"].toString(),
            phone: formData["number"].toString(),
            insurance: formData["insurance"].toString(),
            message: formData["comment"].toString() ? formData["comment"].toString() : "N/A",
        }),
    });

}