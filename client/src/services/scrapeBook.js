import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const scrapeBook = async (url) => {
  try {
    const bookStats = await axios.get(`${baseUrl}/scrape?url=${url}`);
    console.log(bookStats.data);
    return bookStats.data;
  } catch (e) {
    return null;
  }
}

export default scrapeBook;