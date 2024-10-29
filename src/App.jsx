import React, { useState } from 'react';
import DriveAuth from './components/DriveAuth';
import UploadForm from './components/UploadForm';
import PhotoGallery from './components/PhotoGallery';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div>
      <h1>Galería de Fotos de la Boda</h1>
      <DriveAuth setAuthenticated={setAuthenticated} />
      {isAuthenticated && (
        <>
          <UploadForm />
          <PhotoGallery />
        </>
      )}
    </div>
  );
}

export default App;
