import axios from "axios";

const API_KEY = "YOUR_YOUTUBE_API_KEY";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function searchMusic(query: string) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        videoCategoryId: "10", // Music category
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching music from YouTube API", error);
    return [];
  }
}
