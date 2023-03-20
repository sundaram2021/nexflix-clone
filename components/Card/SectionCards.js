import Link from "next/link";
import Card from "./Card";
import styles from "./SectionCard.module.css";

function SectionCards({ title, videos=[], size }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          // console.log({ video });
          return (
          <Link href={`/video/${video.id}`}>
              <Card id={idx} imgUrl={video.imgUrl} size={size} />
          </Link>
        )})}
      </div>
    </section>
  );
}

export default SectionCards;
