import React from 'react';
import PhotoGallery from './components/PhotoGallery';


const App = () => {
  return (
    <div>
      <h1>Galería de Fotos</h1>
      <PhotoGallery /> {/* Asegúrate de que esto solo aparezca una vez */}
    </div>
  );
};

export default App;
