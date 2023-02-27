import ContentLoader from "react-content-loader";
import styles from "../components/Card/Card.module.scss";

function Skeleton() {
  return (
    <div className={styles.card}>
          <ContentLoader
            speed={2}
            width={155}
            height={250}
            viewBox="0 0 155 280"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
            <rect x="0" y="170" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="200" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="250" rx="5" ry="5" width="80" height="25" />
            <rect x="118" y="243" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        </div>
  )
}

export default Skeleton;