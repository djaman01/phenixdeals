import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css'

import './homeGet.css'

import MapCardModel from '../PropsComponents/MapCardModel';
import backUrl from '../backUrl';

export default function HomeGet() {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productType, setProductType] = useState('');//Pour searchBar: State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductType = (e) => setProductType(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input


  useEffect(() => {
    const fetchData = () => {
      axios.get(`${backUrl}/lastproducts?limit=20`) // Add the query parameter for limiting the results
        .then((response) => {
          console.log("Last 20 products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, []);


  const filteredProducts = productObject.filter((item) =>
    item.type.toLowerCase().includes(productType.toLowerCase())
  );

  useEffect(() => {
    document.title = `Phenix Deals`;
  }, []);

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
  

      
        <MapCardModel
          title=" Les 20 Nouveaux produits"
          value={productType}
          onChange={handleProductType}
          placeholder={"Tableau, Déco, Bijou, Livre"}
          error={error}
          filteredProducts={filteredProducts} 
          paginationStyle= "homePagination"
          />
    

  )
}







