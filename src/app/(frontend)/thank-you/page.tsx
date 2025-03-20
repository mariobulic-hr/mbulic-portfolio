import Link from 'next/link'
import styles from './page.module.css'

type PageProps = {
  searchParams: Promise<{
    name: string
  }>
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { name } = await searchParams

  const message = name
    ? `Dear ${name}, Thank You for Your Submission!`
    : 'Thank You for Your Submission!'

  return (
    <div className="page-container container">
      <h1>{message}</h1>
      <div className={styles.thankYouContent}>
        <p>
          I appreciate you taking the time to provide your project details. Your information has
          been received, and I’ll review everything carefully to ensure I understand your needs.
        </p>
        <p>
          Next, I’ll get back to you as soon as possible with a tailored response, including
          insights on how we can bring your project to life efficiently and within your budget. If I
          need any additional details, I’ll reach out to clarify.
        </p>
        <p>Looking forward to working together and creating something great!</p>
        <p>Best, Mario Bulić</p>
        <Link href="/">
          <button>Homepage</button>
        </Link>{' '}
      </div>
    </div>
  )
}

export default ThankYouPage
