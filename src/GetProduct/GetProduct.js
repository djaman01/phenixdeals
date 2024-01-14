import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css'

import "./getProduct.css"
import InputGoogle from '../PropsComponents/InputGoogle';
import MapCardModel from '../PropsComponents/MapCardModel';

export default function GetProduct() {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productType, setProductType] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductType = (e) => setProductType(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input


  useEffect(() => {
    const fetchData = () => {

      axios.get('https://phenixdeals.onrender.com/products')
        .then((response) => {
          console.log("All products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };
    fetchData();
  }, []);//fetch la data avec axios dès qu'on ouvre le browser, comme ça tous les produits apparaisse d'un coup

  //C'est sur cette aray qu'on va map pour pouvoir y accéder par la search bar
  const filteredProducts = productObject.filter((item) =>
    item.type.toLowerCase().includes(productType.toLowerCase())
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
          title=" Tous les Produits "
          value={productType}
          onChange={handleProductType}
          placeholder={"Tableau, Déco, Bijou, Livre"}
          error={error}
          filteredProducts={filteredProducts} />
      </div>

      <Footer />
    </>
  )
}







