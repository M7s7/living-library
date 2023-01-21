import { useState, useEffect } from 'react'; 
import scrapeBook from '../services/scrapeBook';
import { fetchAllBooks, deleteBook, updateBook } from '../services/db';
import Table from './Table';
import NewBook from './NewBook';

const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    const all = await fetchAllBooks();
    setData(all.data);
  }


  useEffect(() => {
    let timer; 

    if (errorMessage !== "") {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  
    return () => clearTimeout(timer);
  }, [errorMessage])


  useEffect(() => {
    fetchData();
  }, []);

  // Event handlers
  const handleCheck = (key) => {
    let newCheck = true;
    if (checked.hasOwnProperty(key)) {
      newCheck = !checked[key];
    }

    setChecked(prev => {
      return (
        {...prev, 
        [key]: newCheck}
      )
    })
  }


  const handleDelete = async () => {
    try {
      setLoading(true);
      // Delete all checked books from db
      for (const url in checked) {
        if (checked[url] === true) {
          await deleteBook(url);
        }
      }

      setChecked({});
      fetchData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // Update all checked books from db
      for (const url in checked) {
        if (checked[url] === true) {
          const book = await scrapeBook(url);
          await updateBook(url, book);
        }
      }

      setChecked({});
      fetchData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <div>
      Welcome, {User}! This is your reading list!
      <p> Filter by: Favourites... </p>
      <button onClick={handleUpdate}> Update </button>
      <button onClick={handleDelete}> Delete </button>
      <button onClick={handleLogOut}> Log Out </button>
      {loading
        ? <p> Please wait a moment while we update your library :) </p>
        :<div>
          <div>{errorMessage}</div>
          <Table 
            data={data} 
            checked={checked} 
            handleCheck={handleCheck}
          />
      
          Enter a link to enter a new book: 
          <NewBook setData={setData} setLoading={setLoading} setErrorMessage={setErrorMessage} />
        </div>
      }
    </div>
  )
}


export default Library;