import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";


export default function DisplayProducts() {

  const [products, setProducts] = useState([]);


  const [editingProductId, setEditingProductId] = useState(null);

  //State that will track, which product is beiing edited
  const [editedProductName, setEditedProductName] = useState('');

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

  //Arrow function that activate the PUT request
  const handleUpdateProduct = (productId) => {
    // Define the updated data: we have to include the fields we want to update
    const updatedProductData = {
      nom: editedProductName,
    };

    // PUT request to update the product:
    //In this code, we use the .put method to handle update requests. It finds the product by its _id, updates it with the provided data, and returns the updated product in the response.
    axios.put(`http://localhost:3005/products/${productId}`, updatedProductData)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        setEditingProductId(null); // Reset the editing state
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }//When the "Update Product" button is clicked, the handleUpdateProduct function is called. This function sends a PUT request to the Express.js server with the updated product data and the product's _id as part of the URL.


  return (
    <>
      <div>
        <h2>All Products Added in Database</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {editingProductId === product._id ? (
                // Show input field and save button when editing
                <div>
                  <input
                    type="text"
                    value={editedProductName}
                    onChange={(e) => setEditedProductName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateProduct(product._id)}>Save</button>
                </div>
              ) : (
                // Show product information and edit button
                <>
                  <p>Type: {product.type}</p>
                  <p>Nom: {product.nom}</p>
                  <div className="icon-holder">
                    <BiEditAlt
                      className='icon'
                      onClick={() => {
                        setEditingProductId(product._id);
                        setEditedProductName(product.nom);
                      }}
                    />
                    <BsTrash className='icon' />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
