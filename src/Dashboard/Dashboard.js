import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import './dashboard.css'


export default function Dashboard() {

  //Store objet venant de Axios.get puis utilisé pour .map dans browser
  const [products, setProducts] = useState([]);

  //Store id object beeing edited and used to show un input + save button when editting
  const [editingProductId, setEditingProductId] = useState(null);

  //Stores the value of the product name that the user is currently editing, to pdate the name
  const [editedProductName, setEditedProductName] = useState('');


  //GET Request to fecth all products posted in the server
  useEffect(() => {
    axios.get('http://localhost:3005/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [products]); //[products]= to change automatically the updated name after editing


  //Arrow function with PUT Request
  const handleUpdateProduct = (productId) => { //parameter to catch the endpoint of url
  
    const updatedProductData = { //Giving "nom" property a state as value, so that it can be changed};
      prix: editedProductName
    }
    // Finds the product by its _id + Update it with updateProductData 
    axios.put(`http://localhost:3005/products/${productId}`,updatedProductData)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        setEditingProductId(null); // Reset the "editingProductId" state after editing, to toggle the input and save button, to the name of the data
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }

  //To cancel the editing of a product and toggle back to the data
  const handleCancelProduct = () => {
    setEditingProductId(null)
  }

  //Arrow function with Delete Request
  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:3005/products/${productId}`)
      .then((response) => {
        console.log('Product deleted successfully:', response.data);
        setProducts(products.filter(product => product._id !== productId));//Update the products states with removing the product with if=productId (product clicked)
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }

  return (
    <>
      <div>
        <h2>All Products Added in Database</h2>
        <table className='table-dashboard'>
          <thead>
            <tr>
            <th className='subtitle-dashboard'>Image</th>
              <th className='subtitle-dashboard'>Type</th>
              <th className='subtitle-dashboard'>Nom</th>
              <th className='subtitle-dashboard'>Dimensions</th>
              <th className='subtitle-dashboard'>Matiere</th>
              <th className='subtitle-dashboard'>Prix</th>
              <th className='subtitle-dashboard'>Code</th>
              <th className='subtitle-dashboard'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className='data-dashboard'>
                  <img
                    className='dashboard-img'
                    src={`http://localhost:3005/${product.imageUrl}`}
                    alt={product.nom}
                  />
                </td>
                <td className='data-dashboard'>{product.type}</td>
                <td className='data-dashboard'>{product.nom}</td>
                <td className='data-dashboard'>{product.dimensions}</td>
                <td className='data-dashboard'>{product.matiere}</td>
                <td className='data-dashboard'>{product.prix}</td>
                <td className='data-dashboard'>{product.code}</td>

                <td className='data-dashboard'>
                  {editingProductId === product._id ? ( //Si clique stylo => donne value= product._id à state et fait apparaitre:
                    <div>
                      <input
                        className='input-edit-dash'
                        type="text"
                        value={editedProductName} //nouveau nom produit
                        onChange={(e) => setEditedProductName(e.target.value)}
                      />
                      <button className='btn-dashboard' onClick={() => handleUpdateProduct(product._id)}>Update</button>
                      <button className='btn-dashboard' onClick={handleCancelProduct}>Cancel</button>
                    </div>
                  ) : ( //Sinon: Fait apparaitre stylo et poubelle
                    <div className='dashboard-icones'>
                      <div className="icones-holder">
                        <BiEditAlt
                          className='icon-dashboard'
                          onClick={() => {
                            setEditingProductId(product._id);
                            setEditedProductName(product.prix);
                          }}
                        />
                        <BsTrash
                          className='icon-dashboard'
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

