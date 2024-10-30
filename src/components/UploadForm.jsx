import React, { useState } from 'react';
import { gapi } from 'gapi-script'; // Asegúrate de que esto esté importado si usas gapi

const FOLDER_ID = '1Plj_X7zH_HOnxv7R9qtjVGbYN_9waVxZ';

const UploadForm = ({ onUpload }) => {
  const [guestName, setGuestName] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Selecciona un archivo para subir.');

    const metadata = {
      name: `${guestName}_${file.name}`,
      parents: [FOLDER_ID],
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    const accessToken = gapi.auth.getToken().access_token;
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Archivo subido', result);
      onUpload(); // Llama a la función para actualizar las fotos
    } else {
      console.error('Error al subir el archivo', response.statusText);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Nombre"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Subir Foto</button>
    </form>
  );
};

export default UploadForm;
