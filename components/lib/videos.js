import videoTestData from "../Data/videos.json";


const fetchVideos = async(url) =>  {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = 'youtube.googleapis.com/youtube/v3';

  const res = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${API_KEY}`
  );
  return await res.json();
} 


export const getCommonVideos = async (url) => {
  
  try {
    
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
    
      // console.log(item);
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
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


export const getYoutubeVideoById = (videoId) => {
  const URL =
  `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);  
}
