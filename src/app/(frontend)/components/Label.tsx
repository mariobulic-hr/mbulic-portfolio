import styles from './Label.module.css'

const Label = ({ label, text }: { label: string; text: string }) => {
  const isUrl = label === 'Project URL'

  return (
    <div className={styles.labelWrapper}>
      <div className={styles.label}>{label}</div>
      {isUrl ? (
        <a href={`https://${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <div className={styles.text}>{text}</div>
      )}
    </div>
  )
}

export default Label
