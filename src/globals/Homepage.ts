import type { GlobalConfig } from 'payload'
import { revalidateHomepage } from '@/hooks/revalidateGlobal'

export const HomepageGlobal: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  hooks: {
    afterChange: [revalidateHomepage],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Tech Stack',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
