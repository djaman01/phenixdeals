import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css'

import './homeGet.css'
import InputGoogle from '../PropsComponents/InputGoogle';




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
    item.type.toLowerCase().includes(productType.toLowerCase())
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

        <h1 className='home-title'>
          Les 20 Nouveaux produits
        </h1>
     

      <InputGoogle value={productType} onChange={handleProductType} placeholder={"Tableau, Déco, Bijou, Livre"}  />

      <div>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-all-products" data-aos='zoom-in'>

            {filteredProducts.map((item) => (

              <Link className= "home-cards-link" onClick={scrollToTop} to={`/fichedatabase/${item._id}`}>

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







