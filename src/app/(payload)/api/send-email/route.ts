import { Resend } from 'resend'

interface SendEmailRequest {
  to: string
  subject: string
  text: string
  html: string
}

export async function POST(req: Request) {
  try {
    // Parse request body as JSON
    const { to, subject, text, html }: SendEmailRequest = await req.json()

    // Initialize Resend client with your API key
    const resend = new Resend(process.env.RESEND_API_KEY as string)

    // Send email using Resend API
    const response = await resend.emails.send({
      from: 'mbulic@live.com',
      to: [to],
      subject,
      text,
      html,
    })

    return new Response(JSON.stringify({ message: 'Email sent successfully', response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
