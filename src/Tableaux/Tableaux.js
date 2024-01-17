import { useState, useEffect } from 'react';
import axios from 'axios';


import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css'

import './tableaux.css'
import { Link } from 'react-router-dom';
import MapCardModel from '../PropsComponents/MapCardModel';
import backUrl from '../backUrl';


export default function Tableaux() {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  useEffect(() => {
      axios.get(`${backUrl}/tableau`)//Je mets un nouveau endpoint pour crée un nouveau path pour ce nouveau GET request pour fetch que les tableaux
        .then((response) => {
          console.log("tableau products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    }, []);//fetch la data avec axios dès qu'on ouvre le browser, comme ça tous les produits apparaisse d'un coup

  //On filtre la state variable productObject pour voir que les produits écrit dans la searchbar: si on écrit rien, on voit tous les produits
  const filteredProducts = productObject.filter(
    (item) => item.auteur.toLowerCase().includes(productName.toLowerCase())
  );

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1000,
      easing: 'ease-in-out',
      // delay: 100,
    });
  })

  return (
    <>
      <Header />

      <div>
        <MapCardModel
          title=" Tous les Tableaux"
          value={productName}
          onChange={handleProductName}
          placeholder={"Nom de l'artiste"}
          error={error}
          //{filteredProducts}= variable qui store la productObject State variable, qu'on filtre
          filteredProducts={filteredProducts} />
      </div>
      
      <Footer />
    </>
  )
}
