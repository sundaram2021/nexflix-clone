import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import { getYoutubeVideoById } from "../../components/lib/videos";
import styles from "../../styles/Video.module.css";
import Navbar from "../../components/Navbar/Navbar";

Modal.setAppElement("#__next");
// import {getYoutubeVideoById} from '../lib/videos.js'

export async function getStaticProps(context) {
  // const video = {
  //   title: "Hi cute dog",
  //   publishTime: "1997-01-05",
  //   description: "A big red dog that is super cute, can he get any bigger?",
  //   channelTitle: "Paramount Pictures",
  //   viewCount: 10045489,
  // };

  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

function video({ video }) {
  const router = useRouter();

  // console.log('video',video);

  const handleRequestClose = () => {
    router.back();
  };

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <>
      <div className={styles.container}>
        <Navbar />
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
    </>
  );
}

export default video;
