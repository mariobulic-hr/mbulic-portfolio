import { Projects } from '../components/Projects'

// This makes the page static
export const revalidate = 3600 // Revalidate every hour

export default async function ProjectsPage() {
  return (
    <div className="page-container container">
      <Projects isHomePage={false} />
    </div>
  )
}
