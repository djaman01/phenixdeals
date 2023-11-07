import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './addProduct.css'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';



export default function AddProduct() {

  const [imageUrl, setImageUrl] = useState('');
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [matiere, setMatiere] = useState('');
  const [prix, setPrix] = useState('');
  const [code, setCode] = useState('');

  // To store the selected file in imageUrl State variable
  const handleFileUpload = (acceptedFiles) => {
    setImageUrl(acceptedFiles[0]);
  };

  //To submit all form data to the server with .post
  const handleSubmit = async (e) => {

    if (imageUrl && nom && type && dimensions && matiere && prix && code) {
      const formData = new FormData();
      formData.append('file', imageUrl);
      formData.append('nom', nom);
      formData.append('type', type);
      formData.append('dimensions', dimensions);
      formData.append('matiere', matiere);
      formData.append('prix', prix);
      formData.append('code', code);

      try {
        const response = await axios.post('http://localhost:3005/upload', formData);

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    else {
      e.preventDefault();
      alert('Add all products before Submit');
    }
  }



  return (

    <div className='all-add-product'>

      <Header />

      <div className="all-box">

        <form className="form-add-product">

          <span className="title-add-product">Add Product</span>
          <span className="subtitle-add-product">Send product to Database</span>

          <div>
            <div className='div-add-product'>
              <input
                required
                className="input-product"
                placeholder="Type produit"
                type="text"
                id="product-type"
                value={type}
                onChange={(e) => setType(e.target.value)} />
            </div>


            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Nom produit"
                type="text"
                id="product-nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>

            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Dimensions"
                type="text"
                id="product-dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>


            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Matiere"
                type="text"
                id="product-matiere"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
              />
            </div>

            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Prix produit"
                type="text"
                id="product-prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />
            </div>

            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Code"
                type="text"
                id="product-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

          </div>

          {/* Dropping image will store it in the imageUrl state variable */}
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone-add-product" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
              </div>
            )}
          </Dropzone>

          {/* When clicked all Data is sent to the server */}
          <Link to="/dashboard">
            <button onClick={handleSubmit}>Submit Product</button>
          </Link>

        </form>

        <div className='image-uploaded'>
          {/* imageUrl est le file, donc on utilise URL.createObjectUrl() méthod, pour en sortir le path=l'url */}
          <img
            className='thumbnail-products'
            src={imageUrl && URL.createObjectURL(imageUrl)}
          />
        </div>

      </div>



      <Footer />

    </div>
  )
}
