import { useState } from 'react';
import { attemptSignup, attemptLogin } from '../services/userAuth';

const LoginForm = ({ setNewUser }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      isLoading(true);
      e.preventDefault();
      const data = new FormData(e.target);
      const LoginData = Object.fromEntries(data.entries());
      
      const { id } = e.nativeEvent.submitter;
      if (id === "login") {
        const newUser = await attemptLogin(LoginData);
        if (newUser !== null) {
          setNewUser(newUser);
        } else {
          setErrorMessage("Login failed: the username or password was incorrect!");
        }
      } else if (id === "signup") {
        const newUser = await attemptSignup(LoginData);
        if (newUser === null) {
          setErrorMessage("Signup failed: this username is already taken!");
        }
      }
      isLoading(false);

    } catch (e) {
      isLoading(false);
      console.log(e)
    }
  }

  if (loading) {
    return (
      <> Currently loading... </>
    )
  }

  return (
    <div>
      {errorMessage && (
        <p> {errorMessage} </p>
      )}
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