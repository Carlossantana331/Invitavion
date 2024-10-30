import React, { useEffect, useState } from 'react';
import UploadForm from './UploadForm'; // Asegúrate de que la ruta sea correcta

function PhotoGallery() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='1Plj_X7zH_HOnxv7R9qtjVGbYN_9waVxZ'+in+parents&fields=files(id,name,webContentLink,thumbnailLink,mimeType)&key=AIzaSyB05y22BnF5s6jKrSFkSqgDrj_Tlw2jsQY&pageSize=100`
      );
      const data = await response.json();
      console.log(data.files); // Verifica el MIME type aquí
      setMedia(data.files);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const getVideoUrl = (fileId) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
};


  return (
    <div className="media-gallery">
      <UploadForm onUpload={fetchMedia} /> {/* Pasa la función para actualizar media */}
      {media.map((item) => (
        <div key={item.id} className="media-item">
          {item.mimeType.startsWith('video/') ? (
            // Si es un video, muestra un elemento de video
            <video src={getVideoUrl(item.id)} controls />
          ) : (
            // Si es una imagen, muestra una etiqueta de imagen
            <img src={item.thumbnailLink} alt={item.name} />
          )}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;


