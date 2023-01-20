import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

// Note: loginData is an Object: {username: XX, password: XX}
// Sign Up
const attemptSignup = async (loginData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/signup`, loginData);
    console.log(res);
  } catch (e) {
    console.log(`Error with signup: ${e}`);
  }

}

// Log In 
const attemptLogin = async (loginData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, loginData);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(`Error with login: ${e}`);
  }
}

// Log Out
const attemptLogout = async () => {
  try {
    await axios.delete(`${baseUrl}/auth/logout`);
    console.log("Successful logout");
  } catch (e) {
    console.log(`Error with logout: ${e}`);
  }
}

export { attemptSignup, attemptLogin, attemptLogout };