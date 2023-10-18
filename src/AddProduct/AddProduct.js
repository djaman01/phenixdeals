import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './addProduct.css'

export default function AddProduct() {

  const [imageUrl, setImageUrl] = useState('');
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [matiere, setMatiere] = useState('');
  const [prix, setPrix] = useState('');
  const [code, setCode] = useState('');

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('nom', nom);
    formData.append('type', type);    
    formData.append('dimensions', dimensions);
    formData.append('matiere', matiere);
    formData.append('prix', prix);
    formData.append('code', code);

    try {
      const response = await axios.post('http://localhost:3005/upload', formData);
      setImageUrl(response.data.imageUrl);
      console.log("the image url is :", imageUrl)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div className="all-box">

        <form className="form-add-product">

          <span className="title-add-product">Add Product</span>
          <span className="subtitle-add-product">Send product to Database</span>

          <div className="div-input-add">

          <div className='div-add-product'>
              <label className='label-add-product'>Type:</label>
              <input
                className="input-product"
                placeholder="Type produit"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <label className='label-add-product'>Nom:</label>
              <input
                className="input-product"
                placeholder="Nom produit"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <label className='label-add-product'>Dimensions:</label>
              <input
                className="input-product"
                placeholder="Dimensions"
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <label className='label-add-product'>Matière:</label>
              <input
                className="input-product"
                placeholder="Matière"
                type="text"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <label className='label-add-product'>Prix:</label>
              <input
                className="input-product"
                placeholder="Prix"
                type="text"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <label className='label-add-product'>Code:</label>
              <input
                className="input-product"
                placeholder="Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

          </div>

          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
              </div>
            )}
          </Dropzone>

          <button>Submit Product</button>

        </form>

      </div>

    </div>
  )
}
