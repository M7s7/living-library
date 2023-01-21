import LoginForm from './LoginForm'

const LoginPage = ({ setNewUser }) => (
  <div>
    <h1>Sign up or log in to get started </h1>
    <LoginForm setNewUser={setNewUser} />

  </div>
);
  
export default LoginPage;