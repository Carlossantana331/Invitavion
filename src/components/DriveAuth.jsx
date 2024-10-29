import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '1021782216207-9jkgfv332bfsldp14jiug7qrtf9v81mn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB05y22BnF5s6jKrSFkSqgDrj_Tlw2jsQY';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

const DriveAuth = ({ setAuthenticated }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: DISCOVERY_DOCS,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(setAuthenticated);
        setAuthenticated(authInstance.isSignedIn.get());
      });
    }
    gapi.load('client:auth2', start);
  }, [setAuthenticated]);

  const handleSignIn = () => gapi.auth2.getAuthInstance().signIn();
  const handleSignOut = () => gapi.auth2.getAuthInstance().signOut();

  return (
    <div>
      <button onClick={handleSignIn}>Iniciar sesión con Google</button>
      <button onClick={handleSignOut}>Cerrar sesión</button>
    </div>
  );
};

export default DriveAuth;
