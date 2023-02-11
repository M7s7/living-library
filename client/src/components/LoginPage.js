import LoginForm from './LoginForm';
import logo from '../img/logo.png';
import TypingHeader from './TypingHeader';

const LoginPage = ({ setNewUser }) => (
  <div className="flex justify-center items-center flex-col h-full py-10 font-serif">
    <img 
      src={logo} 
      className="w-1/8" 
    />

    <TypingHeader />
    <div className="flex justify-center items-center flex-col min-w-1/4 p-4 border-8 border rounded-lg">
      <h2 className="text-2xl leading-tight tracking-tight">
        Sign up or log in to your account 
      </h2>
      <LoginForm setNewUser={setNewUser} />
    </div>
  </div>
);
  
export default LoginPage;