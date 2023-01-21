import scrapeBook from '../services/scrapeBook';
import { addBook } from '../services/db';

const NewBook = ({ setData }) => {

  const handleNewBook = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const link = Object.fromEntries(data.entries()).url;
      const url = link.match(/works\/(\d*)/)[1];
      
      const bookData = await scrapeBook(url);
      // Submit to database
      const newBook = await addBook(bookData);
      if (newBook !== null) {
        setData(prev => prev.concat(newBook));
      }
      //e.target.reset();
    } catch (e) {
      throw new Error();
    }
  }

  return (
    <form onSubmit={handleNewBook}>
    <input type="url" name="url" required></input>
    <input type="submit" value="Submit"/>
  </form>
  )
}


export default NewBook;