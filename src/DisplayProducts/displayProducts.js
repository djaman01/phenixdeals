import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";


export default function DisplayProducts() {

  const [products, setProducts] = useState([]);
  //state qui va contenir tous les objets stored dans la database et qu'on va fetch avec axios.Get
  //C'est sur cette state variable qu'on va map, pour voir tous les produits dans le browser

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
                    onChange={(e) => setEditedProductName(e.target.value)} //Donne une nouvelle value a "editedProductName" state var, qui donne une nouvelle value à la property nom de l'objet store dans la state variable products
                  />
                  {/*Quand on va cliquer sur le buton update, ca va activer la put Request stored dans l'arrow function handleUpdateProduct et va 1) changer le nom 2) return the updated product 3)setEditingProductId to null pour remplacer l'inpu et le save buton par la data rempalcer et le stylo et la poubelle  */}
                  <button onClick={() => handleUpdateProduct(product._id)}>Update</button> 
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
                        setEditingProductId(product._id); //Quand on clique sur le stylo: ça donne une value = product._id à la state variable editingProductId, qui a une valeur par défaut de 'null'. Et comme elle a une valeur ==product.id, alors l'input pour modifier et le bouton Update vont apparaitre
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
