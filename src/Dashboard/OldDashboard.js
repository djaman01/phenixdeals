import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";



import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom';


export default function OldDashboard() {

  //Store objet venant de Axios.get puis utilisé pour .map dans browser
  const [products, setProducts] = useState([]);

  //Store id object beeing edited and used to show un input + save button when editting
  const [editingProductId, setEditingProductId] = useState(null);

  //Stores the value of the product price that the user is currently editing, to update the price
  const [editedProductPrice, setEditedProductPrice] = useState('');
  const [editedProductCode, setEditedProductCode] = useState('');

  const navigate = useNavigate()

  //Protected Route: dans le back-end, on va mettre une middleware pour vérifier le token avant d'autoriser une réponse

  axios.defaults.withCredentials = true; //Pour activer le code qui store le token dans le cookie ET revenir à la page sans logging in le temps que le token s'expire

  useEffect(() => {
    axios.get('http://localhost:3005/dashboard')
      .then((res) => {
        if (res.data === "Success") {
          console.log("Login with middleware successful ")
        }
        else {
          navigate('/')
        }
      })
      .catch((err) => console.log(err));
  }, []);


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

    const updatedProductData = { //Giving "nom" property a state as value, so that it can be changed..etc
      prix: editedProductPrice,
      code: editedProductCode
    }
    // Finds the product by its _id + Update it with updateProductData 
    axios.put(`http://localhost:3005/products/${productId}`, updatedProductData)
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

  //To logout request: Get request to logout / Back-end Respond by clear cookie et écrit Success /Then, if "Success", Front-end reloads the page

  //Pour changer background color logout button when clicked
  const [logoutClicked, setLogoutClicked] = useState(false)


  const handleLogout = () => {
    axios.get('http://localhost:3005/logout')
      .then(res => {
        if (res.data.status === "Success") { //"Success" = message quand on clear le cookie du back-end et donc le token (car stocké dans le cookie)
          window.location.reload(true); //Refresh the application from server side et repart dans Home
          setLogoutClicked(true)
        }
        else {
          alert("error");
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      <Link to='/' className='home-link'>
        <h4 className='home-button'>Accueil</h4>
      </Link>

      <Link to='/addProduct' className='home-link'>
        <h4 className='home-button'>Add Product</h4>
      </Link>
      {/* logout button avec changement de style si clicked */}
      <p className={`logout-button ${logoutClicked ? 'logout-clicked' : ''}`} onClick={handleLogout}>Log Out</p>

      <div>
        <h2>All Products Added in Database</h2>
        <table className='table-dashboard'>
          <thead>
            <tr>
              <th className='subtitle-dashboard'>Image</th>
              <th className='subtitle-dashboard'>Type</th>
              <th className='subtitle-dashboard'>Auteur</th>
              <th className='subtitle-dashboard'>Info Produit</th>
              <th className='subtitle-dashboard'>Etat</th>
              <th className='subtitle-dashboard'>Prix</th>
              <th className='subtitle-dashboard'>Code</th>
              <th className='subtitle-dashboard'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (//On map sur tous les objets de la database
              <tr key={product._id}>
                <td className='data-dashboard'>
                  <img
                    className='dashboard-img'
                    src={`http://localhost:3005/${product.imageUrl}`}
                    alt={product.auteur}
                  />
                </td>
                <td className='data-dashboard'>{product.type}</td>
                <td className='data-dashboard'>{product.auteur}</td>
                <td className='data-dashboard'>{product.infoProduit}</td>
                <td className='data-dashboard'>{product.etat}</td>

                <td className='data-dashboard'>
                  {editingProductId === product._id ? ( //Si clique stylo => donne value= product._id à state editProductId et fait apparaitre:
                    <div>
                      <input
                        className='input-edit-dash'
                        type="text"
                        value={editedProductPrice} //nouveau nom produit
                        placeholder='New price'
                        onChange={(e) => setEditedProductPrice(e.target.value)}
                      />
                    </div>
                  )
                    :
                    product.prix
                  }
                </td>
                <td className='data-dashboard'>
                  {editingProductId === product._id ? (
                    <div>
                      <input
                        className='input-edit-dash'
                        type="text"
                        value={editedProductCode} //nouveau code produit
                        placeholder='New code'
                        onChange={(e) => setEditedProductCode(e.target.value)}
                      />
                    </div>
                  )
                    :
                    product.code
                  }
                </td>

                <td className='data-dashboard'>
                  {editingProductId === product._id ? ( //Si clique stylo => donne value= product._id à state editProductId et fait apparaitre:
                    <div>
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
                            setEditedProductPrice(product.prix);
                            setEditedProductCode(product.code)
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


