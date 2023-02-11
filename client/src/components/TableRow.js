const TableRow = ({ bookData, checked, handleCheck, setBookStats }) => {
  const date = new Date(bookData.timestamp);
  const book = bookData.book;
  return (
    <tr className="even:bg-white odd:bg-blue-50">
      <td>
        <input 
          type="checkbox" 
          onChange={() => handleCheck(book.url)} 
          checked={checked[book.url] === true}
        />
      </td>
      <td>
        <a href={`${process.env.REACT_APP_WORK_URL}/${book.url}`}>
          {book.title}
        </a> 
      </td>
      <td>
        <a href={`${process.env.REACT_APP_USER_URL}/${book.author}`}>
          {book.author}
        </a> 
      </td>
      <td>
        {book.stats.published.split("-").reverse().join("/")}
      </td>
      <td>
        {book.stats.status 
          ? book.stats.status.split("-").reverse().join("/")
          : "Never"
        }
      </td>
      <td>
        {book.stats.status_flag ? book.stats.status_flag : "N/A"}
      </td>
      <td>
        {date.toLocaleString()}
      </td>
      <td className="flex justify-center font-bold">
        <button
          onClick={() => setBookStats(bookData)}
        > show </button>
      </td>
    </tr>
  )
}

export default TableRow;