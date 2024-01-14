import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';


import Aos from 'aos';
import 'aos/dist/aos.css'

import './decoration.css'
import { Link } from 'react-router-dom';
import InputGoogle from '../PropsComponents/InputGoogle';
import MapCardModel from '../PropsComponents/MapCardModel';




export default function Decoration() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  useEffect(() => {//useEffect is essential for ensuring that the data fetching operation occurs when the component is initially mounted.

      axios.get('https://phenixdeals.onrender.com/decoration')//Je mets un nouveau endpoint pour crée un nuveau path pour ce nouveau GET request pour fetch que les bijoux 
        .then((response) => {
          console.log("tableau products fetched", response.data);
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
    (item) => item.auteur.toLowerCase().includes(productName.toLowerCase())
  );


  return (
    <>

      <Header />


      <div>
        <MapCardModel
          title= "Tous les objets de Décoration"
          value={productName}
          onChange={handleProductName}
          placeholder={"Type d'objet déco"}
          error={error}
          filteredProducts={filteredProducts} />
      </div>
      
      <Footer />


    </>
  )
}
