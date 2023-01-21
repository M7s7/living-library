import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchAllBooks = async () => {
  try {
    const all = await axios.get(`${baseUrl}/api/all`, { withCredentials: true });
    return all;

  } catch (e) {
    console.log("Error");
    throw new Error();
  }
}

const addBook = async (book) => {
  try {
    const bookData = await axios.post(`${baseUrl}/api/create`, book, { withCredentials: true });
    return bookData.data;
  } catch (e) {
    console.log("Book already exists in database");
    return null;
  }
}

export { fetchAllBooks, addBook };