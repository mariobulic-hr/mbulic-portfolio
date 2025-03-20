import styles from './Label.module.css'

const Label = ({ label, text }: { label: string; text: string }) => {
  const URLChecker = (label: string) => {
    if (label === 'Project URL') {
      return (
        <a href={`https://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      )
    } else {
      return <div className={styles.text}>{text}</div>
    }
  }

  return (
    <div className={styles.labelWrapper}>
      <div className={styles.label}>{label}</div>
      {URLChecker(label)}
    </div>
  )
}

export default Label
