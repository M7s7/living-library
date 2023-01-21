const Table = ({ data, checked, handleCheck }) => {
  console.log(data)
  if (data.length === 0) {
    return (
      <div>
        You have no books stored! Add some to begin.
      </div>
    )
  }

  console.log(checked)
  return (
    <div>
        <table>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Last Updated</th>
            <th>Last Checked</th>
          </tr>
          {data.map(bookData => 
            <Row 
              bookData={bookData} 
              checked={checked} 
              handleCheck={handleCheck} 
              key={bookData.book.url}
            />
          )}
        </table>
    </div>
  )
}


const Row = ({ bookData, checked, handleCheck }) => {
  const date = new Date(bookData.timestamp);
  const book = bookData.book;
  return (
    <tr>
      <td><input type="checkbox" onChange={() => handleCheck(book.url)} checked={checked[book.url] === true}/></td>
      <td><a href={`${process.env.REACT_APP_WORK_URL}/${book.url}`}>{book.title}</a> </td>
      <td><a href={`${process.env.REACT_APP_USER_URL}/${book.author}`}>{book.author}</a> </td>
      <td>{book.stats.published.split("-").reverse().join("/")}</td>
      <td>
        {book.stats.status 
          ? book.stats.status.split("-").reverse().join("/")
          : "Never updated"
        }
      </td>
      <td>{date.toLocaleString()}</td>
    </tr>
  )
}

export default Table;



