import axios from 'axios';

const baseUrl = "http://localhost:3001";

const scrapeBook = async (url) => {
  try {
    const bookStats = await axios.get(`${baseUrl}/scrape?url=${url}`);
    console.log(bookStats.data);
    return bookStats.data;
  } catch (e) {
    console.log(e);
  }
}

export default scrapeBook;