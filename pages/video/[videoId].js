

import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

function video() {
  const router = useRouter();

  const handleRequestClose = () => {
    router.back();
  };

  const video = {
    title: "Hi cute dog",
    publishTime: "1997-01-05",
    description: "A big red dog that is super cute, can he get any bigger?",
    channelTitle: "Paramount Pictures",
    viewCount: 10045489,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch The Video"
        onRequestClose={handleRequestClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default video;
