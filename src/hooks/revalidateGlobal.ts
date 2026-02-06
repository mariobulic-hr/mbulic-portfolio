import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateHomepage: GlobalAfterChangeHook = ({ req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    payload.logger.info('Revalidating path: /')
  }
}
