import { useState, useEffect } from 'react'; 
import { fetchAllBooks } from '../services/db';
import Table from './Table';
import NewBook from './NewBook';

const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const all = await fetchAllBooks();
      setData(all.data);
    }
    fetchData();
  }, []);

  const handleCheck = (key) => {
    setChecked(prev => {
      return (
        {...prev, 
        [key]: !prev[key]}
      )
    })
  }

  return (
    <div>
      Welcome, {User}! This is your library!
      <button onClick={handleLogOut}> Log Out. </button>
      <Table data={data} handleCheck={handleCheck}/>
      Enter a link to enter a new book: 
      <NewBook setData={setData} />
    </div>
  );
}


export default Library;