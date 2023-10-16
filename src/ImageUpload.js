import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
  // import ImageList from './ImageList';

function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState(''); // Add state for image name

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('name', imageName); // Add the image name to the form data

    try {
      const response = await axios.post('http://localhost:3005/upload', formData);
      setImageUrl(response.data.imageUrl);
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

      {/* Input for Image Name */}
      <div>
        <label>Image Name:</label>
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
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
