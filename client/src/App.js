import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import scrapeBook from './services/scrapeBook'

const App = () => {
  const [data, changeData] = useState([])
  const [checked, setChecked] = useState({})
  

  useEffect(() => {
    const newChecked = {};
    data.forEach((book) => newChecked[book.url] = false);
    setChecked(newChecked)
    
    // Testing
    scrapeBook("");
  }, [])

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
      living library - check status of books, articles, documentation
      <Table data={data} />
    </div>
  )
}






export default App;
