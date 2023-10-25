import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import './dashboard.css'


export default function Dashboard() {

  const [products, setProducts] = useState([]);
//Store objet venant de Axios.get puis .map dans browser

  //State pour faire apparaitre un input + save button à la place de la data, quand on veut l'edit !
  //editingProductId stores the id of the product beeing edited; so that it keeps track of which product is currently being edited
  const [editingProductId, setEditingProductId] = useState(null);

  //This state variable stores the value of the product name that the user is currently editing.
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
  }, [products]);
  //On donne [products] pour que dès qu'il y a un changement de ce state, donc dès qu'on l'edit, ca va changer automatiquement le nom du produit dans le browser du dashboard, sans rafraichir la page (mais auss iquand on ajoite simplement un produit, car la valeur par défaut de products est [] empy array, donc quand on ajoute quelque chose ça change)
  //Arrow function that activate the PUT request
  //On va mettre le paramettre (productId) en endpoint de l'url: il aura donc la valeur de _id du produit et on pourra donc identifier le produit
  const handleUpdateProduct = (productId) => {
    // Define the updated data: we have to include the fields we want to update
    const updatedProductData = {
      nom: editedProductName, //setEditedProductName sera dans le onChange de l'edit input, pour donner un nouveau nom à la propriété nom de la state variable products
    };

    // PUT request to update the product:
    // It finds the product by its _id, updates it with the provided data with the value of the state variale "editedProductName", and returns the updated product in the response.
    axios.put(`http://localhost:3005/products/${productId}`, updatedProductData)
      .then((response) => {
        console.log('Product updated successfully:', response.data);//Returns the updated product data
        setEditingProductId(null); // Reset the "editingProductId" state variable to null value, so that it toggle the input and save button, to the name of the data
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }//When the "Update Product" button is clicked, the handleUpdateProduct function is called. This function sends a PUT request to the Express.js server with the updated product data and the product's _id as part of the URL.
  const handleCancelProduct = () =>{
    setEditingProductId(null)
  }

  //Handles the Delete Request for a product
  const handleDeleteProduct = (productId) => {

    //Sending a DELETE request to the server to delete the product
    axios.delete(`http://localhost:3005/products/${productId}`)
      .then((response) => {
        // If the DELETE request is successful, this code is executed.
        console.log('Product deleted successfully:', response.data);
        // Update the products states that contains all the data: if it's id in MongoDB is different than productId parameter, then we keep it = on supprime le produit avec la data sur lequel on a cliqué
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }

  return (
    <>
      <div>
        <h2>All Products Added in Database</h2> 
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Nom</th>
              <th>Dimensions</th>
              <th>Matiere</th>
              <th>Prix</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    className='dashboard-img'
                    src={`http://localhost:3005/${product.imageUrl}`}
                    alt={product.nom}
                  />
                </td>
                <td>{product.type}</td>
                <td>{product.nom}</td>
                <td>{product.dimensions}</td>
                <td>{product.matiere}</td>
                <td>{product.prix}</td>
                <td>{product.code}</td>
                <td>
                  {editingProductId === product._id ? (
                    // Show input field and save button when editing
                    <div>
                      <input
                        type="text"
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                      />
                      <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
                      <button onClick={handleCancelProduct}>Cancel</button>

                    </div>
                  ) : (
                    // Show product information and edit/delete buttons
                    <div className='dashboard-product'>
                      <div className="icon-holder">
                        <BiEditAlt
                          className='icon'
                          onClick={() => {
                            setEditingProductId(product._id);
                            setEditedProductName(product.nom);
                          }}
                        />
                        <BsTrash
                          className='icon'
                          onClick={() => handleDeleteProduct(product._id)}
                        />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  
}

