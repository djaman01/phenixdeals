import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import Aos from 'aos';
import 'aos/dist/aos.css'

import './bijoux.css'
import { Link } from 'react-router-dom';
import InputGoogle from '../PropsComponents/InputGoogle';
import MapCardModel from '../PropsComponents/MapCardModel';



export default function Bijoux() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  useEffect(() => {
    
      axios.get('https://phenix-back.onrender.com/bijou')//Je mets un nouveau endpoint pour crée un nuveau path pour ce nouveau GET request pour fetch que les bijoux 
        .then((response) => {
          console.log("All products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
  
  }, []);//fetch la data avec axios dès qu'on ouvre le browser, comme ça tous les produits apparaisse d'un coup


  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1000,
      easing: 'ease-in-out',
      // delay: 100,
    });
  })
  const filteredProducts = productObject.filter(
    (item) => item.infoProduit.toLowerCase().includes(productName.toLowerCase())
  );

  return (

    <>

      <Header />


      <div>
        <MapCardModel
          title="Tous les Bijoux"
          value={productName}
          onChange={handleProductName}
          placeholder={" Type de Bijou"}
          error={error}
          filteredProducts={filteredProducts} />
      </div>
      
      <Footer />
    </>
  )
}
