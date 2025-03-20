import { Projects } from '../components/Projects'
export default async function ProjectsPage() {
  return (
    <div className="page-container container">
      <Projects isHomePage={false} />
    </div>
  )
}
