import { Resend } from 'resend'

interface SendEmailRequest {
  to: string
  subject: string
  text: string
  html: string
}

const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = requestLog.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  requestLog.set(ip, recent)

  if (recent.length >= MAX_REQUESTS) {
    return true
  }

  recent.push(now)
  requestLog.set(ip, recent)
  return false
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { to, subject, text, html }: SendEmailRequest = await req.json()

    if (!to || !subject || (!text && !html)) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY as string)

    const response = await resend.emails.send({
      from: 'hello@mariobulic.com',
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
