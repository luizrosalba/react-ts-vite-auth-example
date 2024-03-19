import './App.css'
import { GoogleLogin } from '@react-oauth/google';


function App() {

  return (
    <>
      <h1>Example Authentication</h1>
      <div>Google Test 123</div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />;
    </>
  )
}

export default App
