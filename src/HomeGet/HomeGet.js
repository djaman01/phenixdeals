import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css'

import './homeGet.css'



export default function HomeGet() {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input


  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:3005/lastproducts?limit=20') // Add the query parameter for limiting the results
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
    item.type.toLowerCase().includes(productName.toLowerCase())
  );

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1500,
      easing: 'ease-in-out',
      // delay: 100,
    });
  })


  return (
    <div className='all-home-cards'>

      <Link to="/newsignup">
        <h1 className='home-title'>
          Les 20 Nouveaux produits
        </h1>
      </Link>

      <div className='input-home'>

        <div class="searchbar">
          <div class="searchbar-wrapper">
            <div class="searchbar-left">
              <div class="search-icon-wrapper">
                <span class="search-icon searchbar-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                    </path>
                  </svg>
                </span>
              </div>
            </div>

            <div class="searchbar-center">
              <div class="searchbar-input-spacer"></div>
              <input value={productName} onChange={handleProductName} class="searchbar-input" title="Search" role="combobox" maxlength="2048" name="q" autocapitalize="off" autocomplete="off" placeholder="tableau, déco, bijou, livre" type="text" />
            </div>
          </div>
        </div>

      </div>

      <div>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-all-products" data-aos='zoom-in'>

            {filteredProducts.map((item) => (

              <Link onClick={scrollToTop} to={`/fichedatabase/${item._id}`}>

                <div className="item-all-products">

                  <div className="div-thumbnail-allproducts">
                    <img
                      className='thumbnail-products'
                      src={`http://localhost:3005/${item.imageUrl}`}//On store le path de l'image dans la database,, donc c'est ce qu'il faut chercher
                      alt={item.nom}
                    />
                  </div>


                  <div className="text-all-products">

                    <h3 className='all-products-type'>{item.type}</h3>

                    <div className='nom-dimensions'>
                      <h4 style={{ fontSize: "15px" }}>{item.nom}/</h4>
                      <h4 style={{ fontSize: "15px" }}>{item.dimensions}</h4>
                    </div>
                    <h4 className='all-products-matiere' style={{ fontSize: "15px" }}>{item.matiere}</h4>

                    <h4 className='all-products-price'>{item.prix}</h4>

                  </div>

                </div>
              </Link>

            ))}

          </div>
        )}
      </div>

    </div>
  )
}







