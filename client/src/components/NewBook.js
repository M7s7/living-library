import scrapeBook from '../services/scrapeBook';
import { addBook } from '../services/db';

const NewBook = ({ setData, setLoading, setErrorMessage }) => {

  const handleNewBook = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const data = new FormData(e.target);
      const link = Object.fromEntries(data.entries()).url;

      // Regex to extract work id (url)
      const url = link.match(/works\/(\d*)/);
      if (url === null) {
        setErrorMessage("The URL does not link to a valid work!");
        throw new Error("URL does not link to a valid work");
      }

      // Scraping data from website
      const bookData = await scrapeBook(url[1]);
      if (bookData === null) {
        setErrorMessage("The URL does not link to a valid work!");
        throw new Error("URL does not link to a valid work");
      }
      // Submit to database
      const newBook = await addBook(bookData);
      if (newBook === null) {
        setErrorMessage("The book already exists");
        throw new Error("Tried to add existing book");
      }
      setData(prev => prev.concat(newBook));
      e.target.reset();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
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