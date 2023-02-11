import { useState } from 'react';
import { attemptSignup, attemptLogin } from '../services/userAuth';
import Spinner from './Spinner';
import MessageFlash from './MessageFlash';

const LoginForm = ({ setNewUser }) => {
  const [Message, setMessage] = useState("");
  const [isError, setError] = useState(true);
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      isLoading(true);
      setError(true);
      e.preventDefault();
      const data = new FormData(e.target);
      const LoginData = Object.fromEntries(data.entries());
      
      const { id } = e.nativeEvent.submitter;
      if (id === "login") {
        const newUser = await attemptLogin(LoginData);
        if (newUser !== null) {
          setNewUser(newUser);
        } else {
          setMessage("Login failed: the username or password was incorrect!");
        }
      } else if (id === "signup") {
        const newUser = await attemptSignup(LoginData);
        setMessage("Signup successful! Log in with the same details to continue.");
        setError(false);
        if (newUser === null) {
          setMessage("Signup failed: this username is already taken!");
          setError(true);
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
      <div className="p-16">
        <Spinner className="p-7" />
        </div>
    )
  }


  return (
    <div className="p-2 min-w-full">
      <MessageFlash Message={Message} isError={isError} />
      
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label class="block mb-2 font-medium text-gray-900 dark:text-white">Username </label>
          <input 
            type="text" 
            className="bg-slate-100 border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
            name="username" 
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">Password </label>
          <input 
            type="password" 
            className="bg-slate-100 border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
            name="password" 
            required 
          />
        </div>

        <div className="flex gap-5 justify-center">
          <input 
            type="submit" 
            id="login" 
            value="Sign In" 
            className="rounded-full font-bold text-white bg-secondary hover:bg-red-500 font-medium text-sm px-5 py-2.5 text-center"
          />
          <input 
            type="submit" 
            id="signup" 
            value="Sign Up"
            className="rounded-full font-bold text-white bg-secondary hover:bg-red-500 font-medium text-sm px-5 py-2.5 text-center"
          />
        </div>
      </form>
  </div>
  )
};

export default LoginForm;