import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'

const StoriesDetailPage = async ({ params }: { params: { slug: string } }) => {
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

  const renderContent = (children: any[]) => {
    return children.map((child, index) => {
      if (child.type === 'paragraph') {
        return (
          <p key={index}>
            {child.children.map((textChild: any, textIndex: number) => (
              <span key={textIndex}>{textChild.text}</span>
            ))}
          </p>
        )
      }
      if (child.type === 'heading') {
        const HeadingTag = `h${child.tag}` as keyof React.JSX.IntrinsicElements
        return (
          <HeadingTag key={index}>
            {child.children.map((textChild: any, textIndex: number) => (
              <span key={textIndex}>{textChild.text}</span>
            ))}
          </HeadingTag>
        )
      }
      return null
    })
  }

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.subtitle}</p>
      <p>{new Date(story.publishedDate).toLocaleDateString()}</p>
      <div className="storyContent">{renderContent(story.content.root.children)}</div>
    </div>
  )
}

export default StoriesDetailPage
