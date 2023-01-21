import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchAllBooks = async () => {
  try {
    const all = await axios.get(`${baseUrl}/api/all`, { withCredentials: true });
    return all;

  } catch (e) {
    throw new Error();
  }
}

export { fetchAllBooks };