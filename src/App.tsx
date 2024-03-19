import './App.css'
import { GoogleLogin } from '@react-oauth/google';
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { IdTokenData } from './components/DataDisplay';
import { loginRequest } from './authConfig';

const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create',
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h1>Example Authentication</h1>
      <div className='classrow'>
        <h2>Google</h2>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

      </div>
      <div className='classrow'>
        <h2>Azure ID </h2>
        <AuthenticatedTemplate>
          {activeAccount ? (
            <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
          ) : null}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button className="signInButton" onClick={handleRedirect} >
            Sign up
          </button>
        </UnauthenticatedTemplate>

      </div>
    </div>
  )
}

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  );
};

export default App
