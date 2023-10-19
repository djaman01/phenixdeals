import { useState, useEffect } from 'react';
import axios from 'axios';

import "./getProduct.css"

export default function GetProduct() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');
  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit


  const handleProductName = (e) => setProductName(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

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
  }, []);//Dès que la value de l'input changee, fetch la data avec axios


  return (
    <>
      <div>
        <h1>All Products</h1>
      </div>

      <div>
        <input value={productName} onChange={handleProductName} type="text" />
      </div>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <ul>
              {productObject.map((item) => (
                <li key={item.id}>
                  <h2>{item.nom}</h2>
                  <img
                    src={item.imageUrl}
                    alt={item.nom}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </>
  )
}
