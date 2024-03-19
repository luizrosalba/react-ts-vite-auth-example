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
    <>
      <h1>Example Authentication</h1>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
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
    </>
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
