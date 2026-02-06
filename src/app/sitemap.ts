import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://mariobulic.com'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  const stories = await payload.find({
    collection: 'stories',
    limit: 100,
  })

  const projectUrls: MetadataRoute.Sitemap = projects.docs.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const storyUrls: MetadataRoute.Sitemap = stories.docs.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(story.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...projectUrls,
    ...storyUrls,
  ]
}
