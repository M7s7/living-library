import { useState, useEffect } from 'react'; 
import { fetchAllBooks } from '../services/db';

const Library = ({ User, handleLogOut }) => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(async () => {
    const all = await fetchAllBooks();
    await setData(all);

    const newChecked = {};
    data.forEach((book) => newChecked[book.url] = false);
    setChecked(newChecked)

  }, []);

  const Table = ({data}) => {
    const handleChange = (key) => {
      setChecked(prev => {
        return (
          {...prev, 
          [key]: !prev[key]}
        )
      })
      console.log(checked);
    }

    return (
      <div>
        <table>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Last Updated</th>
            <th>Status</th>
          </tr>
          {data.map((item) => {
            return (
              <tr>
                <td>
                  <input 
                    type="checkbox" 
                    checked={checked[item.url]}
                    onChange={() => handleChange(item.url)}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.published}</td>
                <td>{item.last_updated}</td>
                <td>{item.status}</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }

  return (
    <div>
      Welcome, {User}! This is your library!
      <button onClick={handleLogOut}> Log Out. </button>
      <Table data={data}/>
    </div>
  );
}


export default Library;