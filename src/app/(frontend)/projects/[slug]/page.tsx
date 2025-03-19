import payloadConfig from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import styles from './page.module.css'
import Label from '../../components/Label'
import Image from 'next/image'
import { formatDateToMonthYear, getPlaceholderImage } from '@/app/lib/utils'

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
      return null
    })
  }

  return (
    <div className={`${styles.projectContainer} container`}>
      <div className={styles.projectSidebar}>
        <Image
          src={getPlaceholderImage(160, 160)}
          alt={project.title}
          width={160}
          height={160}
          style={{ borderRadius: '50%', margin: '0 auto' }}
        />
        <Label label="Project" text={project.title} />
        <Label label="Status" text={project.subtitle} />
        <Label label="Role" text={project.role} />
        {project.projectURL && <Label label="Site URL" text={project.projectURL} />}
        <Label label="Start date" text={formatDateToMonthYear(project.timeStart)} />
        <Label label="End date" text={formatDateToMonthYear(project.timeEnd)} />
        <Label
          label="Tech stack"
          text={project.projectTechnologies.map((technology) => technology.technology).join(', ')}
        />
      </div>
      <div className={styles.projectContent}>
        {renderContent(project.description.root.children)}
      </div>
    </div>
  )
}

export default ProjectDetailsPage
