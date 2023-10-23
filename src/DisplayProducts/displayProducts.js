import { useState, useEffect } from 'react';
import axios from 'axios';


export default function DisplayProducts() {

  const [products, setProducts] = useState([]);

  //Using the useEffect hook to make a GET request to the '/products' endpoint on the Express.js server.
  useEffect(() => {
    // GET Request to fetch all products from the server
    axios.get('http://localhost:3005/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
    <div>
      <h2>All Products Added in DataBase</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>Type: {product.type}</p>
            <p>Nom: {product.nom}</p>
  
          </li>
        ))}
      </ul>
    </div>  
    
    </>
  )
}
