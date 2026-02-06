import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateCollection'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange('/projects', ['/'])],
    afterDelete: [revalidateAfterDelete('/projects', ['/'])],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },

    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'timeStart',
      type: 'date',
      required: true,
    },
    {
      name: 'timeEnd',
      type: 'date',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'projectTechnologies',
      type: 'array',
      label: 'Technologies Used',
      required: true,
      minRows: 1,
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'projectURL',
      label: 'Project URL',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'githubURL',
      label: 'GitHub URL',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
