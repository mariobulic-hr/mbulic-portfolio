import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import RichTextRenderer from '../../components/RichTextRenderer'
import styles from './page.module.css'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// This makes the page static
export const revalidate = 3600 // Revalidate every hour

const StoriesDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const story = await payload
    .find({
      collection: 'stories',
      where: { slug: { equals: slug } },
    })
    .then((result) => result.docs[0])

  if (!story) {
    notFound()
  }

  return (
    <div className="page-container container">
      <div className={styles.storyHeader}>
        <h1>{story.title}</h1>
        <div className={styles.storyHeaderMeta}>
          <span>{story.subtitle}</span>
          <div>
            {new Date(story.publishedDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
      <div className={styles.storyContent}>
        <RichTextRenderer content={story.content} />
      </div>
    </div>
  )
}

export default StoriesDetailPage
