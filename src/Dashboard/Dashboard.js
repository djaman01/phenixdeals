import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import DataTable from "react-data-table-component"

import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom';



export default function Dashboard() {

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
  const handleUpdateProduct = (productId) => { //parameter to catch the endpoint of url pour identifier le produit que l'on souhaite modifier
    const updatedProductData = { //les propriété prix et code devront être remplacé par les valeurs des states variables ci-après
      prix: editedProductPrice,
      code: editedProductCode
    }
    axios.put(`http://localhost:3005/products/${productId}`, updatedProductData) // Finds the product by its _id + Update it with updateProductData 
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        setEditingProductId(null); // Reset the "editingProductId" state after editing, to toggle the input and save button pour voir les noms de la data et ne plus voir update et cancel
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
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

    //To cancel the editing of a product and toggle back to the data
    const handleCancelProduct = () => {
      setEditingProductId(null)
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

  //-------------------------------------------------

  const columns = [
    {
      name: "Image",
      selector: 'imageUrl', //property name in the Model object schema= the data that should be found in the imageUrl property of each row.
      cell: row => <img className='dashboard-img' src={`http://localhost:3005/${row.imageUrl}`} alt={row.auteur} /> //row.auteur va marcher même si pas défini précedemment
    },

    //Don't need a custom cell property because the default rendering is suitable for displaying text or number data in the cells. 
    {
      name: "Type",
      selector: 'type',
      sortable: true, //Permet d'ordonné par ordre Alphabétic ou inverse
    },
    {
      name: "Auteur",
      selector: 'auteur',
      sortable: true,
      title: (
        <div style={{ fontSize: '16px', color: 'blue' }}>
          Auteur
        </div>
      ),
    },
    {
      name: "Info Produit",
      selector: 'infoProduit',
      sortable: true,
    },
    {
      name: "Etat",
      selector: 'etat',
      sortable: true,
    },

    //Here we need the cell property because we want to customize it
    {
      name: "Prix",
      selector: 'prix',
      sortable: true,
      cell: row => (
        editingProductId === row._id ? (
          <div>
            <input
              className='input-edit-dash'
              type="text"
              value={editedProductPrice}
              placeholder='New price'
              onChange={(e) => setEditedProductPrice(e.target.value)}
            />
          </div>
        ) : (
          row.prix
        )
      )
    },
    {
      name: "Code",
      selector: 'code',
      sortable: true,
      cell: row => (
        editingProductId === row._id ? (
          <div>
            <input
              className='input-edit-dash'
              type="text"
              value={editedProductCode}
              placeholder='New code'
              onChange={(e) => setEditedProductCode(e.target.value)}
            />
          </div>
        ) : (
          row.code
        )
      )
    },
    {//Colonne Actions, qui va afficher des boutons différents en fonction de la valeur de editingProductId
      name: "Actions",
      selector: '_id',
      cell: row => (
        editingProductId === row._id ? (
          <div>
            <button className='btn-dashboard' onClick={() => handleUpdateProduct(row._id)}>Update</button>
            <button className='btn-dashboard' onClick={handleCancelProduct}>Cancel</button>
          </div>
        ) : (
          <div className='dashboard-icones'>
            <div className="icones-holder">
              <BiEditAlt
                className='icon-dashboard'
                onClick={() => { //Quand on clique sur le stylo, ca met à jour les states variables suivantes:
                  setEditingProductId(row._id); //editingProductId === _id du produit => Donc change code colonne Action, prix et code
                }}
              />
              <BsTrash
                className='icon-dashboard'
                onClick={() => handleDeleteProduct(row._id)}
              />
            </div>
          </div>
        )
      )
    }
  ];

  // Input search bar

  //State qui va contenir la value qu'on va écrire en direct dans l'input 
  const [filterText, setFilterText] = useState('');

  //event handler a mettre dans onChange de l'input
  const handleFilter = (e) => setFilterText(e.target.value)

  //Pour que le contenu du DashBoard soit = à ce qu'il y a écrit dans l'input: si on écrit rien on voit tout / si on écrit, on voit les items qui correspondent à ce qu'on écrit
  const filteredProducts = products.filter((product) =>
    product.auteur.toLowerCase().includes(filterText.toLowerCase())
  );


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

      <input
        type="text"
        placeholder="Filter by Auteur"
        value={filterText}
        onChange={handleFilter}
      />

      <div>
        <h2>All Products Added in Database</h2>

        {/* Création Tableau Dashboard */}
        <DataTable
          columns={columns}
          data={filteredProducts} //la data qui va structurer le tableau
          pagination
          fixedHeader //Pour que le header suive quand on scroll down

        />
      </div>
    </>
  );

}


