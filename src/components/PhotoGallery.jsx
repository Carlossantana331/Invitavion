import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm'; // Asegúrate de que la ruta sea correcta

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='1Plj_X7zH_HOnxv7R9qtjVGbYN_9waVxZ'+in+parents&fields=files(id,name,webContentLink,thumbnailLink)&key=AIzaSyB05y22BnF5s6jKrSFkSqgDrj_Tlw2jsQY`
      );
      const data = await response.json();
      setPhotos(data.files);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div className="photo-gallery">
      <UploadForm onUpload={fetchPhotos} /> {/* Pasa la función para actualizar fotos */}
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <img src={photo.thumbnailLink} alt={photo.name} />
          <p>{photo.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;
