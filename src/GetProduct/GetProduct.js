import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css'

import "./getProduct.css"
import InputGoogle from '../PropsComponents/InputGoogle';




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

      axios.get('http://localhost:3005/products')
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
      duration: 1500,
      easing: 'ease-in-out',
      // delay: 100,
    });
  })


  return (
    <>

      <Header />
      <div>

        <h1>All Products</h1>
      </div>
      
      <div>
        <InputGoogle value={productType} onChange={handleProductType} placeholder={"Tableau, Déco, Bijou, Livre"} />
      </div>
  
      <div className='all-card-products'>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-all-products" data-aos='zoom-in'>
{/* il faut uiliser filteredProducts.map car on va filtrer avec searchbar dans cette array d'objet  */}
            {filteredProducts.map((item) => (

              <Link className="allproducts-div-link"onClick={scrollToTop} to={`/fichedatabase/${item._id}`}>

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
      <Footer />
    </>
  )
}







