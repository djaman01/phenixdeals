import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';

import './livres.css'

import Aos from 'aos';
import 'aos/dist/aos.css'

import { Link } from 'react-router-dom';


export default function Livres() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  useEffect(() => {
    const fetchData = () => {

      axios.get('http://localhost:3005/livre')//Je mets un nouveau endpoint pour crée un nuveau path pour ce nouveau GET request pour fetch que les bijoux 
        .then((response) => {
          console.log("tableau products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, []);//fetch la data avec axios dès qu'on ouvre le browser, comme ça tous les produits apparaisse d'un coup

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1500,
      easing: 'ease-in-out',
    
    });
  })

  return (
    <>
      <Header />
      <div>
        <h1>Tous les Livres</h1>
      </div>

      <div>
        <input value={productName} onChange={handleProductName} type="text" />
      </div>
      <div>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-livres" data-aos='zoom-in'>
            {productObject.map((item) => (


              <Link to={`/fichedatabase/${item._id}`}>
                <div className="item-livres">

                  <div className="div-thumbnail-livres">
                    <img
                      className='thumbnail-livres'
                      src={`http://localhost:3005/${item.imageUrl}`}//On store le path de l'image dans la database,, donc c'est ce qu'il faut chercher
                      alt={item.nom}
                    />
                  </div>


                  <div className="text-livres">

                    <h3 className='livres-type'>{item.type}</h3>

                    <div className='livres-nom-dimensions'>
                      <h4 style={{ fontSize: "15px" }}>{item.nom}/</h4>
                      <h4 style={{ fontSize: "15px" }}>{item.dimensions}</h4>
                    </div>
                    <h4 className='livres-matiere' style={{ fontSize: "15px" }}>{item.matiere}</h4>

                    <h4 className='livres-price'>{item.prix}</h4>

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
