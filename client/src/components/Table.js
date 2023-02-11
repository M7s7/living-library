import TableRow from './TableRow';

const Table = ({ data, checked, handleCheck, setBookStats }) => {
  console.log(data)
  if (data.length === 0) {
    return (
      <div className="p-2 h-full w-full">
        No results!
      </div>
    )
  }

  return (
    <div className="p-2 h-full w-full">
      <p>Found <b>{data.length}</b> {data.length === 1 ? "result":"results"}: </p>
        <table className="table-auto text-left border-separate min-w-full">
          <thead className="uppercase">
            <tr className="bg-slate-300">
              <th className="px-2"></th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Updated</th>
              <th>Status</th>
              <th>Last Checked</th>
              <th>Stats</th>
            </tr>
          </thead>

          <tbody>
            {data.map(bookData => 
              <TableRow 
                bookData={bookData} 
                checked={checked} 
                handleCheck={handleCheck} 
                key={bookData.book.url}
                setBookStats={setBookStats}
              />
            )}
          </tbody>
        </table>
    </div>
  )
}


export default Table;



