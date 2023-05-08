import axios from 'axios';
import { getBearerToken } from './twitterApi';

const TWITTER_USER_ID = '<YOUR_TWITTER_USER_ID>';

async function postTweetWithImage(req:any, res:any) {
  const { base64Image } = req.body;

  try {
    const bearerToken = await getBearerToken();

    const mediaResponse = await axios.post(
      'https://api.twitter.com/1.1/media/upload.json',
      { media_data: base64Image },
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const mediaId = mediaResponse.data.media_id_string;

    const tweetResponse = await axios.post(
      `https://api.twitter.com/1.1/statuses/update.json?status=Mira%20mi%20tarjeta%20generada%21&media_ids=${mediaId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}

export default postTweetWithImage;
