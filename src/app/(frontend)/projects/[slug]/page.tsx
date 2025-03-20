import payloadConfig from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Label from '../../components/Label'
import { formatDateToMonthYear, getPlaceholderImage } from '@/app/lib/utils'
import ImageWrapper from '../../components/ImageWrapper'
import RichTextRenderer from '../../components/RichTextRenderer'
import styles from './page.module.css'

const ProjectDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
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

  const url =
    typeof project.image === 'object' && project.image?.url
      ? project.image.url
      : getPlaceholderImage(160, 160)

  return (
    <div className="page-container container">
      <div className={`${styles.projectContainer}`}>
        <div className={styles.projectSidebar}>
          <div className={styles.projectImage}>
            <ImageWrapper
              image={{
                url: url,
                alt: project.title || 'Project image',
              }}
              width={80}
              height={80}
            />
          </div>
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
