import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Label from '../../components/Label'
import { formatDateToMonthYear } from '@/app/lib/utils'
import RichTextRenderer from '../../components/RichTextRenderer'
import styles from './page.module.css'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600

const ProjectDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const project = await payload
    .find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    .then((response) => response.docs[0])

  if (!project) {
    notFound()
  }

  return (
    <div className="page-container container">
      <div className={`${styles.projectContainer}`}>
        <div className={styles.projectSidebar}>
          <Label label="Project" text={project.title} />
          <Label label="Status" text={project.subtitle} />
          <Label label="Role" text={project.role} />
          {project.projectURL && <Label label="Project URL" text={project.projectURL} />}
          <Label label="Start date" text={formatDateToMonthYear(project.timeStart)} />
          <Label label="End date" text={formatDateToMonthYear(project.timeEnd)} />
          <Label
            label="Tech stack"
            text={project.projectTechnologies.map((technology) => technology.technology).join(', ')}
          />
        </div>
        <div className={styles.projectContent}>
          <RichTextRenderer content={project.description} />
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage
