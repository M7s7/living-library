const StatsPanel = ({ bookStats }) => {
  if (bookStats === null) {
    return <div className="p-2 w-full h-full">
      Click on a book to see more stats!
    </div>
  }

  const book = bookStats.book;
  return (
    <div className="p-10 w-full h-full overflow-auto">
      <p className="text-lg">
        Data for <b>{book.title}</b> by <b>{book.author}</b>:
      </p>
      <p>LANGUAGE: {book.language}</p>
      RATING: {book.rating}

      <div className="flex flex-row justify-evenly p-3">
      <div> 
        <u>STATS</u>
        <ul className="list-none">
          <li>Chapters: <b>{book.stats.chapters}</b></li>
          <li>Comments: <b>{book.stats.comments}</b></li>
          <li>Hits: <b>{book.stats.hits}</b></li>
          <li>Kudos: <b>{book.stats.kudos}</b></li>
          <li>Words: <b>{book.stats.words}</b></li>
        </ul>
      </div>

      <div>
        <u>USER LISTS</u>
        <ul className="list-none"> 
          <li>Favourites: <b>{bookStats.filters.favourite? "Yes":"No"}</b></li>
          <li>Reading List: <b>{bookStats.filters.reading? "Yes":"No"}</b></li>
          <li>Already read: <b>{bookStats.filters.completed? "Yes":"No"}</b></li>
        </ul>
      </div>
      </div>
      <div>
        <u>TAGS</u>
        <ul className="list-none flex flex-col content-between space-y-1">
          <li className="text-sm"><b>Fandoms ({book.tags.fandoms.length}): </b>{book.tags.fandoms.join(", ")}</li>
          <li className="text-sm"><b>Characters ({book.tags.characters.length}): </b>{book.tags.characters.join(", ")}</li>
          <li className="text-sm"><b>Other ({book.tags.additional.length}): </b>{book.tags.additional.join(", ")}</li>
        </ul>
      </div>

    </div>
  )
}

export default StatsPanel;