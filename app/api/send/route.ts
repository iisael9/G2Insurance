
// import EmailTemplate from '@/app/components/email-template';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'],
//       subject: 'Hello world',
//       react: EmailTemplate({
//           name: '',
//           email: '',
//           phone: '',
//           insurance: '',
//           message: ''
//       }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
// import { Resend } from 'resend';
// import EmailTemplate from '@/app/components/email-template' // Adjust the path as necessary

// const resend = new Resend('YOUR_RESEND_API_KEY');

// export default async function handler(req: Request, res: Response) {
//   if (req.method === 'POST') {
//     //const { name, email, phone, insurance, message } = req.body;

//     try {
//       // Sending the email using Resend
//       await resend.emails.send({
//         from: 'Your Company <no-reply@yourcompany.com>',
//         to: 'iisael090@gmail.com',
//         subject: 'New Contact Form Submission',
//         react: EmailTemplate({
//             name: '',
//             email: '',
//             phone: '',
//             insurance: '',
//             message: ''
//         }), // Convert JSX to HTML (Resend will handle it automatically)
//       });

//       res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Error sending email' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

