const Library = ({ User, handleLogOut }) => (
  <div>
    Welcome, {User}! This is your library!
    <button onClick={handleLogOut}> Log Out. </button>
  </div>
);

export default Library;