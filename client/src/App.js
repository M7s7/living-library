import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Library from './components/Library';
import { attemptLogout } from './services/userAuth';

const App = () => {
  const [User, setUser] = useState(null);

  // Initial set-up
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [])

  const handleNewUser = (name) => {
    localStorage.setItem("user", name);
    setUser(name);
  }

  const handleLogOut = () => {
    localStorage.clear();
    attemptLogout();
    setUser(null);
  }
  
  return (
    <body className="bg-primary min-h-screen">
      <div>
      {User === null 
        ? <LoginPage 
            setNewUser={handleNewUser} 
          />
        : <Library 
            User={User} 
            handleLogOut={handleLogOut} 
          />
      }
     </div>
    </body>
  )
}


export default App;
