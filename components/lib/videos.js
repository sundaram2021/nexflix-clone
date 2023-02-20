import videoData from "../Data/videos.json";

export const getCommonVideos = async (url) => {
  const API_KEY = process.env.API_KEY;
  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3';

    const res = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${API_KEY}`
    );
    const data = await res.json();
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;

      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (err) {
    console.error("Something went wrong in video library", err);
    return [];
  }
};


export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&type=video&maxResults=25&q=${searchQuery}`
  return getCommonVideos(URL)
}

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN";
  return getCommonVideos(URL);  
}
