import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";

import DataTable from "react-data-table-component"

import { StyleSheetManager } from 'styled-components';

import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom';

const customStyles = {
  headCells: {
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      backgroundColor: "grey"
    },
  },
};



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

  //Protected route: pour empêcher d'accéder à la page /dashboard si token n'est pas dans le cookie = si pas login en tant qu'admin
  useEffect(() => {
    axios.get('http://localhost:3005/dashboard')
      .then((res) => {
        if (res.data === "Success") { //si token présent et vérifié
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


  //Arrow function with PUT Request pour changer prix et code
  const handleUpdateProduct = (productId) => { //parametre auquel on va donner comme valeur _id quand on va appeler handleUpdateProduct(row._id)
    const updatedProductData = {//valeurs des colonnes comme dans le modèle du back-end à modifier avec input et value={state variable}
      prix: editedProductPrice,
      code: editedProductCode
    }
    axios.put(`http://localhost:3005/products/${productId}`, updatedProductData) // Finds the product by its _id + Update it with updateProductData / pas besoin de useParams car on n'a pas besoin d'un truc dynamique qui peut changer 
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        setEditingProductId(null); // Reset the "editingProductId" state after editing, to toggle the input and save button pour voir stylo et poubelle au lieu de update et cancel
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
        setProducts(products.filter(product => product._id !== productId));//But= que le produit supprimé disparaisse de notre state qui stocke tous les produits
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

  //!!!!! voir return( <DataTable columns={columns} data={filteredProducts} /> ) donc même si on écrit rien, ça amène les données de la database pour chaque property = selector de chaque colonne
  //Si on veut faire des modifications dans uen cellules, on écrit cell: row => modif.

  const columns = [
    {
      name: "Image",
      selector: row => row.imageUrl, //property name dans modèle base de donnée pour l'extraire de la base de donnée
      cell: row => <img className='dashboard-img' src={`http://localhost:3005/${row.imageUrl}`} alt={row.auteur} />, //Obligé de faire cell et src sinon ne montre que le path de l'image qui est dans base de donnée
      style: {
        color: 'blue',
        fontWeight: 'bold',
      },
    },

    //On ne met pas de cell property, car data base de donnée est suffisante
    {
      name: "Type",
      selector: row => row.type,
      sortable: true, //Permet d'ordonné par ordre Alphabétic ou inverse
    },
    {
      name: "Auteur",
      selector: row => row.auteur,
      sortable: true,
    },
    {
      name: "Info Produit",
      selector: row => row.infoProduit,
      sortable: true,
    },
    {
      name: "Etat",
      selector: row => row.etat,
      sortable: true,
    },

    //Here we need the cell property because we want to customize it
    {
      name: "Prix",
      selector: row => row.prix,
      cell: row => (
        editingProductId === row._id ? ( //quand on clique sur stylo on a codé plus bas setEditingProductId(row._id); donc ce code apparaitra
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
      selector: row => row.code,
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
      selector: row => row._id,
      cell: row => (
        editingProductId === row._id ? (
          // On sera obligé d'écrire l'event handler dans le onclick, car on cible row._id et on ne peut l'atteindre que ici
          <div>
            <button className='btn-dashboard' onClick={() => handleUpdateProduct(row._id)}>Update</button>
            <button className='btn-dashboard' onClick={handleCancelProduct}>Cancel</button>
          </div>
        ) : (
          <div className='dashboard-icones'>
            <div className="icones-holder">
              <BiEditAlt //Quand on clique sur le stylo, state variable editingProductId = _id du produit => Donc change code colonne Action, prix et code comme écrit précédemment
                className='icon-dashboard'
                onClick={() => { setEditingProductId(row._id) }}
              />

              /
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

  //Pour ce npm on utilise des styled components, donc on doit écrire ce code pour éviter l'écriture d'erreur dans la console
  const shouldForwardProp = (prop) => prop !== 'sortActive';

  return (
    <>

      <StyleSheetManager shouldForwardProp={shouldForwardProp}> {/* Pour éviter errur styledprops component dans la console */}
        <div className="all-btn-dash">
          <Link to='/' className='home-link'>
            <button className='btn-dash-home'>Accueil</button>
          </Link>


          <Link to='/addProduct' className='home-link'>
            <button className='btn-dash-add'>Add Product</button>
          </Link>

             {/* logout button avec changement de style si clicked */}
        <p className={`logout-button ${logoutClicked ? 'logout-clicked' : ''}`} onClick={handleLogout}>Log Out</p>

        </div>

     
        <input
          type="text"
          placeholder="Filter by Auteur"
          value={filterText}
          onChange={handleFilter}
          className='input-search-dash'
        />

        <div>
          <h2 className='dashboard-name-title'>All Products Added in Database</h2>

          {/* Création Tableau Dashboard */}
          <DataTable
            columns={columns}
            data={filteredProducts} //la data qui va structurer le tableau, c'est pourquoi ça amène les données de la database, sans rie nécrire
            pagination
            fixedHeader //Pour que le header suive quand on scroll down
            customStyles={customStyles}

          />
        </div>
      </StyleSheetManager>
    </>
  );

}


