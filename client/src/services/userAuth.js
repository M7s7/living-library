import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_URL;

// Note: loginData is an Object: {username: XX, password: XX}
// Sign Up
const attemptSignup = async (loginData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/signup`, loginData, {
      withCredentials: true
    });
    return res.data;
  } catch (e) {
    console.log(`Error with signup: ${e}`);
    return null;
  }

}

// Log In 
const attemptLogin = async (loginData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, loginData, {
      withCredentials: true
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(`Error with login: ${e}`);
    return null;
  }
}

// Log Out
const attemptLogout = async () => {
  try {
    await axios.delete(`${baseUrl}/auth/logout`, {
      withCredentials: true
    });
    console.log("Successful logout");
  } catch (e) {
    console.log(`Error with logout: ${e}`);
  }
}

export { attemptSignup, attemptLogin, attemptLogout };