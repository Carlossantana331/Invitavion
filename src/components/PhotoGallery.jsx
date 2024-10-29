import React, { useEffect, useState } from 'react';

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  

  useEffect(() => {
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

    fetchPhotos();
  }, []);

  return (
    <div className="photo-gallery">
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
