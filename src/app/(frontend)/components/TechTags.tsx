import styles from './TechTags.module.css'

interface TechStackItem {
  technology: string
}

interface TechTagsProps {
  techTags?: TechStackItem[]
}

const TechTags = ({ techTags }: TechTagsProps) => {
  if (!techTags || techTags.length === 0) return null

  return (
    <div className={styles.techTag}>
      <ul className={styles.techTagList}>
        {techTags.map((tags, index) => (
          <li key={index} className={styles.techTagListItem}>
            {tags.technology}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TechTags
