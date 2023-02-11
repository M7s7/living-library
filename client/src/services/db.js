import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

const fetchAllBooks = async () => {
  try {
    const all = await axios.get(`${baseUrl}/api/all`, { withCredentials: true });
    return all;
  } catch (e) {
    console.log(e);
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


const deleteBook = async (url) => {
  try {
    const bookData = await axios.delete(`${baseUrl}/api/delete`, { 
      withCredentials: true,
      params: { url: url }
    });
    console.log(`Deleted book ${bookData.data.book.title}`);
    return bookData.data;
  } catch (e) {
    return null;
  }
}

const updateBook = async (url, book) => {
  try {
    const bookData = await axios.put(`${baseUrl}/api/update`, book, { 
      withCredentials: true,
      params: { url: url }
    });
    console.log(`Updated book ${bookData.data.book.title}`);
    return bookData.data;
  } catch (e) {
    return null;
  }
}


const filterBook = async (url, filtertype) => {
  try {
    // No update needed when favouriting, so can pull from DB
    const oldBook = await axios.get(`${baseUrl}/api/read`, {
      withCredentials: true,
      params: { url: url }
    });

    const bookData = await axios.put(`${baseUrl}/api/update?${filtertype}=true`, oldBook.data.book, { 
      withCredentials: true,
      params: { url: url}
    });
    console.log(`Toggled book ${bookData.data.book.title}`);
    return bookData.data;
  } catch (e) {
    throw new Error(e);
  }
}


export { fetchAllBooks, addBook, deleteBook, updateBook, filterBook };