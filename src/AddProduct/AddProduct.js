import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import './addProduct.css'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';




export default function AddProduct() {

  //On crée des states pour chaque input field, pour stocké les valeurs qu'on va écrire en direct
  //Comme il y a l'ilage, faire un state avec un objet comme dans contact ne va pas marcher
  const [imageUrl, setImageUrl] = useState('');
  const [auteur, setauteur] = useState('');
  const [type, setType] = useState('');
  const [infoProduit, setInfoProduit] = useState('');
  const [etat, setEtat] = useState('');
  const [prix, setPrix] = useState('');
  const [code, setCode] = useState('');

  //To submit all form data to the server with .post
  const handleSubmit = async (e) => {
    //Pour interdire l'envoie si on ne rempli pas un champ de addProduct
    if (imageUrl && auteur && type && etat && infoProduit && prix && code) {
      const formData = new FormData(); //Vu qu'on envoie un file, on utilise la method FormData() pour créer un objet avec key-values, et tout envoyer en 1 fois
      formData.append('file', imageUrl);// 'file"=property / imageUrl= Value = state variable
      formData.append('auteur', auteur);
      formData.append('type', type);
      formData.append('etat', etat);
      formData.append('infoProduit', infoProduit);
      formData.append('prix', prix);
      formData.append('code', code);

      try {
        const response = await axios.post('https://phenix-back.onrender.com/upload', formData);//On envoie tout en 1 fois
        alert('Product submitted to DataBase')
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    else {
      e.preventDefault();
      alert('Add all products before Submit');
    }
  }
  //Pour faire une protected route à addProduct et n'y accéder que si token avec admin
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://phenix-back.onrender.com/addProduct')
      .then((res) => {
        if (res.data === "Success") {
          console.log("Login with middleware successful ")
        }
        else {
          navigate('/')
        }
      })
      .catch((err) => console.log(err));
  }, []);


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
                placeholder="Auteur produit"
                type="text"
                id="product-auteur"
                value={auteur}
                onChange={(e) => setauteur(e.target.value)}
              />
            </div>

            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Info Produit"
                type="text"
                id="info-produit"
                value={infoProduit}
                onChange={(e) => setInfoProduit(e.target.value)}
              />
            </div>

            <div className='div-add-product'>
              <input
                className="input-product"
                placeholder="Etat produit"
                type="text"
                id="etat-produit"
                value={etat}
                onChange={(e) => setEtat(e.target.value)}
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
          <Dropzone onDrop={acceptedFiles => setImageUrl(acceptedFiles[0])}>
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
