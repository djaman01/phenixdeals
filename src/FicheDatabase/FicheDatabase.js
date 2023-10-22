import { Link, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useState, useEffect } from "react";
import axios from "axios";


export default function FicheDatabase() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  useEffect(() => {
    const fetchData = () => {

      axios.get('http://localhost:3005/article')
        .then((response) => {
          console.log("article fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, []);//fetch la data avec axios dès qu'on ouvre le browser, comme ça tous les produits apparaisse d'un coup



  return (
    <>
      <Header />
      <div>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-tableaux">

            {productObject.map((item) => (
          
                <div className="item-tableaux">

                  <div className="div-thumbnail-tableaux">
                    <img
                      className='thumbnail-tableaux'
                      src={`http://localhost:3005/${item.imageUrl}`}//On store le path de l'image dans la database,, donc c'est ce qu'il faut chercher
                      alt={item.nom}
                    />
                  </div>


                  <div className="text-tableaux">

                    <h3 className='tableaux-type'>{item.type}</h3>

                    <div className='tableaux-nom-dimensions'>
                      <h4 style={{ fontSize: "15px" }}>{item.nom}/</h4>
                      <h4 style={{ fontSize: "15px" }}>{item.dimensions}</h4>
                    </div>
                    <h4 className='tableaux-matiere' style={{ fontSize: "15px" }}>{item.matiere}</h4>

                    <h4 className='tableaux-price'>{item.prix}</h4>

                  </div>

                </div>
            


            ))}

          </div>
        )}
      </div>

      <Footer />

    </>



  )
}
