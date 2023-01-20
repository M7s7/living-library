import { useState } from 'react';
import { attemptSignup, attemptLogin } from '../services/userAuth';

const LoginForm = ({ setNewUser }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const LoginData = Object.fromEntries(data.entries());
      
      const { id } = e.nativeEvent.submitter;
      if (id === "login") {
        const newUser = await attemptLogin(LoginData);
        setNewUser(newUser);

      } else if (id === "signup") {
        attemptSignup(LoginData);

      console.log("signup Action")  
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username </label>
        <input type="text" name="username" required autoComplete="off"/>
      </div>

      <div>
        <label>Password </label>
        <input type="password" name="password" required />
      </div>

      <div>
        <input type="submit" id="login" value="Log In" />
        <input type="submit" id="signup" value="Sign Up" />
      </div>
    </form>
  </div>
  )
};

export default LoginForm;