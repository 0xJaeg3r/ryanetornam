import styles from '@/styles/Home.module.css'
import Terminal from '../../components/Terminal'
import asciiArt from './asciiArt'

export default function Home() {
  return (
    <div className={styles.container}>
      <pre>
        {asciiArt}
      </pre>
      <h3>
          <span className={styles.help}>Welcome to my web terminal!! Type <span style={{color: "white"}} >help</span> to view the list of commands </span>
      </h3>
      <p>
        Visit <a href="#" target="_blank" rel="noopener noreferrer">My Twitter</a>
      </p>
      <Terminal/>
    </div>
  )
}
