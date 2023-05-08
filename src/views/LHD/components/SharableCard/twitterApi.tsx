import axios from 'axios';

const TWITTER_API_KEY = '0lITflLbMnmeFAvYs2EcUPud9';
const TWITTER_API_SECRET_KEY = 'SsDBMYuGTBPiJwfSvsQxrZmWNAYW86pqBCCw4fUzYZinwmOs7P';

async function getBearerToken() {
  const token = Buffer.from(
    `${TWITTER_API_KEY}:${TWITTER_API_SECRET_KEY}`
  ).toString('base64');

  const response = await axios.post(
    'https://api.twitter.com/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }
  );

  return response.data.access_token;
}

export { getBearerToken };
