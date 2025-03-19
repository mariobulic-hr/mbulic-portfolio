import styles from './Label.module.css'

const Label = ({ label, text }: { label: string; text: string }) => {
  return (
    <div className={styles.labelWrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}

export default Label
