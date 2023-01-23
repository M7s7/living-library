import { useState, useEffect } from 'react'; 
import scrapeBook from '../services/scrapeBook';
import { fetchAllBooks, deleteBook, updateBook, favouriteBook } from '../services/db';
import Table from './Table';
import NewBook from './NewBook';

const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [favouriteView, setFavouriteView] = useState(false);

  const fetchData = async () => {
    const all = await fetchAllBooks();
    setData(all.data);
  }

  // Set and remove error message
  useEffect(() => {
    let timer; 

    if (errorMessage !== "") {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  
    return () => clearTimeout(timer);
  }, [errorMessage])

  // Fetch data from database
  useEffect(() => {
    fetchData();
  }, []);

  // EVENT HANDLERS
  // Handle check box click
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

  // Handle delete button click
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

  // Handle update button click
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
  
  // Handle mark as favourite
  const markFavourite = async () => {
    try {
      setLoading(true);
      // Toggle "favourite" status of all checked books
      for (const url in checked) {
        if (checked[url] === true) {
          await favouriteBook(url);
        }
      }

      setChecked({});
      fetchData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  // Handle search box input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div>
      Welcome, {User}! This is your reading list!
      
      <div>
        Search by title or author: <input type="text" onChange={handleSearch}/>
        | Favourite view: {favouriteView ? "On" : "Off"} <button onClick={() => setFavouriteView(!favouriteView)}> Toggle </button>
      </div>
      <button onClick={handleUpdate}> Update </button>
      <button onClick={handleDelete}> Delete </button>
      <button onClick={markFavourite}> Favourite </button>
      <button onClick={handleLogOut}> Log Out </button>
      {loading
        ? <p> Please wait a moment while we update your library :) </p>
        :<div>
          <div>{errorMessage}</div>
          <Table 
            data={data.filter((item) => {
              console.log(item.favourite);
              if (favouriteView && item.favourite === false) {
                return false;
              }

              return item.book.author.includes(search) || item.book.title.includes(search);
            })}
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