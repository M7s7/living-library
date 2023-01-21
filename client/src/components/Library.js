import { useState, useEffect } from 'react'; 
import { fetchAllBooks, deleteBook } from '../services/db';
import Table from './Table';
import NewBook from './NewBook';

const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});

  const fetchData = async () => {
    const all = await fetchAllBooks();
    setData(all.data);
  }

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

  // Refetch data
  const handleDelete = async () => {
    try {
      // Delete all checked books from db
      for (const url in checked) {
        if (checked[url] === true) {
          await deleteBook(url);
        }
      }

      setChecked({});
      fetchData();
    } catch (e) {
      throw new Error(e);
    }
  }


  return (
    <div>
      Welcome, {User}! This is your reading list!
      <p> Filter by: Favourites... </p>
      <button> Update </button>
      <button onClick={handleDelete}> Delete </button>
      <button onClick={handleLogOut}> Log Out </button>
      <Table data={data} checked={checked} handleCheck={handleCheck}/>
      Enter a link to enter a new book: 
      <NewBook setData={setData} />
    </div>
  )
}


export default Library;