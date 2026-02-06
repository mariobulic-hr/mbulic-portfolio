import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateAfterChange = (
  basePath: string,
  extraPaths: string[] = [],
): CollectionAfterChangeHook =>
  ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      revalidatePath(basePath)
      payload.logger.info(`Revalidating path: ${basePath}`)

      if (doc.slug) {
        const detailPath = `${basePath}/${doc.slug}`
        revalidatePath(detailPath)
        payload.logger.info(`Revalidating path: ${detailPath}`)
      }

      for (const path of extraPaths) {
        revalidatePath(path)
        payload.logger.info(`Revalidating path: ${path}`)
      }
    }
    return doc
  }

export const revalidateAfterDelete = (
  basePath: string,
  extraPaths: string[] = [],
): CollectionAfterDeleteHook =>
  ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      revalidatePath(basePath)
      payload.logger.info(`Revalidating path: ${basePath}`)

      if (doc?.slug) {
        revalidatePath(`${basePath}/${doc.slug}`)
      }

      for (const path of extraPaths) {
        revalidatePath(path)
      }
    }
    return doc
  }
