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

  //Création objet formData auquel on attache les state variable, pour tout envoyer avec .post
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

    <div className='all-add-product'>

      <Header />

      <div className="all-box">

        <form className="form-add-product">

          <span className="title-add-product">Add Product</span>
          <span className="subtitle-add-product">Send product to Database</span>


          <div className="label-input">
            <label className='label-add-product' htmlFor='product-type'>Type:</label>
            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Type produit"
                type="text"
                id="product-type"
                value={type}
                onChange={(e) => setType(e.target.value)} />
            </div>
          </div>

          <div className="label-input">
            <label className='label-add-product' htmlFor='product-nom'>Nom:</label>
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
          </div>

          <div className="label-input">
            <label className='label-add-dimensions' htmlFor='product-dimensions'>Dimensions:</label>
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
          </div>

          <div className="label-input">
            <label className='label-add-matiere' htmlFor='product-matiere'>Matiere:</label>
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
          </div>

          <div className="label-input">
            <label className='label-add-prix' htmlFor='product-prix'>Prix:</label>
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
          </div>


          <div className="label-input">
            <label className='label-add-code' htmlFor='product-code'>Code:</label>
            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Code"
                type="text"
                id="product-code"
                value={prix}
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

          <Link to="/dashboard">
            <button>Submit Product</button>
          </Link>

        </form>

      </div>

      <Footer />

    </div>
  )
}
