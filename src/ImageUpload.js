import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
  // import ImageList from './ImageList';

function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [nom, setNom] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [matiere, setMatiere] = useState('');
  const [prix, setPrix] = useState('');
  const [code, setCode] = useState('');

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('nom', nom);
    formData.append('dimensions', dimensions);
    formData.append('matiere', matiere);
    formData.append('prix', prix);
    formData.append('code', code);
    
    try {
      const response = await axios.post('http://localhost:3005/upload', formData);
      setImageUrl(response.data.imageUrl);
      console.log("the image urln is :", imageUrl)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div>
        <label>Dimensions:</label>
        <input
          type="text"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
        />
      </div>
      <div>
        <label>Matiere:</label>
        <input
          type="text"
          value={matiere}
          onChange={(e) => setMatiere(e.target.value)}
        />
      </div>
      <div>
        <label>Prix:</label>
        <input
          type="text"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
      </div>
      <div>
        <label>Code:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>      
      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img
            width={300}
            height={300}
            src={`http://localhost:3005/${imageUrl}`}
            alt="Uploaded"
          />
        </div>
      )}
      {/* <ImageList /> */}
    </div>
  );
}

export default ImageUpload;
