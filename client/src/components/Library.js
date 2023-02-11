import { useState, useEffect } from 'react'; 
import scrapeBook from '../services/scrapeBook';
import { fetchAllBooks, deleteBook, updateBook, filterBook } from '../services/db';
import { Button, Input, ToggleButton } from './basic/index';
import { Table, NewBook, Spinner, FilterBadges, MessageFlash, StatsPanel } from './index';


const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [favouriteView, setFavouriteView] = useState(false);
  const [readingView, setReadingView] = useState(false);
  const [hideCompleted, setCompletedView] = useState(false);
  const [hideExplicit, setExplicitView] = useState(false);
  const [bookStats, setBookStats] = useState(null);

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
  
  // Filter marked books
  const markFilter = async (filtertype) => {
    try {
      setLoading(true);
      for (const url in checked) {
        if (checked[url] === true) {
          await filterBook(url, filtertype);
        }
      }

      setChecked({});
      fetchData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  // The complete filter
  const filterBooks = (item) => {
    // Explicit
    if (hideExplicit && item.book.rating === "Explicit") {
      return false;
    }
    // Completed
    if (hideCompleted && item.filters.completed === true) {
      return false;
    }
    // Favourite View
    if (favouriteView && item.filters.favourite === false) {
      return false;
    }
    // Reading View
    if (readingView && item.filters.reading === false) {
      return false;
    }
    // Author/Title search
    if ((item.book.author.toLowerCase().includes(searchBook.toLowerCase()) || item.book.title.toLowerCase().includes(searchBook.toLowerCase())) == false) {
      return false;
    }
    // Tags search
    for (const array of Object.values(item.book.tags)) {
      for (const tag of array) {
        if (tag.toLowerCase().includes(searchTags.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <body className="flex flex-col h-screen font-serif justify-center items-center bg-rose-900">
      <div className="flex flex-col w-3/4 bg-white relative p-16 items-center top-0 h-screen overflow-hidden">
        <h1 className="flex text-5xl justify-center font-bold">living library.</h1>
        <p className="text-2xl p-1">Welcome, {User}!</p>
        
        Search by:
        <div className="flex flex-row max-w-xl w-full justify-center pb-3 gap-1.5">
          <Input text={"title/author"} handleChange={(e) => setSearchBook(e.target.value)} />
          <Input text={"tag"} handleChange={(e) => setSearchTags(e.target.value)} />
        </div>

        <div className="flex gap-5">
          Filters: <FilterBadges 
            favouriteView={favouriteView}
            readingView={readingView}
            hideCompleted={hideCompleted}
            hideExplicit={hideExplicit}
          />
        </div>

        <div className="flex gap-1 p-2">
          toggle:
          <ToggleButton handleClick={() => setFavouriteView(!favouriteView)} text="favourite" /> | 
          <ToggleButton handleClick={() => setReadingView(!readingView)} text="reading" /> | 
          <ToggleButton handleClick={() => setCompletedView(!hideCompleted)} text="completed" /> |
          <ToggleButton handleClick={() => setExplicitView(!hideExplicit)} text="explicit" />

        </div>

        <div className="flex justify-center gap-1 py-3">
          <Button handleClick={handleUpdate} text="Update" />
          <Button handleClick={handleDelete} text="Delete" />
          <Button handleClick={() => markFilter("favourite")} text="Favourites" />
          <Button handleClick={() => markFilter("reading")} text="Add to reading" />
          <Button handleClick={() => markFilter("completed")} text="Add to read" />
          <Button handleClick={handleLogOut} text="Log Out"  />
        </div>
        <div>
          <MessageFlash Message={errorMessage} isError={true} />
        </div>
        <div className="flex flex-col overflow-auto h-full w-full px-5">
          {loading
            ? <div className="flex justify-center flex-col items-center p-10"> <p className="py-10"> Please wait a moment while we update your library :) </p> <Spinner /> </div>
            : <div 
                className="flex flex-row justify-between h-full"  
              >
                <div className="border-4 overflow-auto w-2/3 p-1 bg-red-50">
                  <Table 
                    data={data.filter((item) => filterBooks(item))}
                    checked={checked} 
                    handleCheck={handleCheck}
                    setBookStats={setBookStats}
                  />
                </div>
                <div className="border-4 flex w-1/3 p-1 bg-violet-50">
                  <StatsPanel bookStats={bookStats} />
                </div>
              </div>
          }
        </div>
      </div>

      <div className="flex w-3/4 justify-center bottom-0 py-3 pb-5 bg-green-50">
        <NewBook 
          setData={setData} 
          setLoading={setLoading} 
          setErrorMessage={setErrorMessage} 
        />
      </div>
    </body>
  )
}

export default Library;