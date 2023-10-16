import { useState } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import axios from 'axios'
import './tableaux.css'


export default function Tableaux() {
  const [formData, setFormData] = useState({
    nom: "",
    dimensions: "",
    matiere: "",
    prix: "",
    code: "",
    thumbnail: ""

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 //Création de l'API avec la Request POST
 
  const handleSubmit = async (e) => {

    // Pas besoin de créer cet objet en bas, car on l'a crée plus haut et avec toutes les properties
    // const formData = new FormData();
    // formData.append("nom", formData.nom);
    // formData.append("thumbnail", formData.thumbnail);

    try {
      const response = await axios.post('http://localhost:3005/tableau', formData); //we say to use the formData object created
      
      console.log('Response from the server:', response.data);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

//Fetch Api
  //   try { 
  //     const response = await fetch("http://localhost:3005/tableau", {
  //       method: "POST",
  //       body: formData, // Use the FormData object
  //     });

  //     if (response.status === 201) {
  //       console.log("Tableau record added successfully");
  //       setFormData({
  //         nom: "",
  //         thumbnail: ""
  //       });
  //     } else {
  //       console.error("Error adding Tableau record");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <Header />

      <div className="titre-page">
        <h1> Tous nos Tableaux </h1>
      </div>
      <div>
        <h2 className="add-tableau">Add New Tableau</h2>

        <form className="form-product" onSubmit={handleSubmit}>

          < div className='nom-produit'>
            <label htmlFor="nom-produit">Nom:</label>
            <input
              type="text"
              id="nom-produit"
              name="nom-produit"
              value={formData.nom}
              onChange={handleInputChange}
              placeholder='nom du produit'
            />
          </div>

          < div className='dimensions'>
            <label htmlFor="dimensions">Dimensions:</label>
            <input
              type="dimensions"
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder='Dimensions produit'
            />
          </div>

          < div className='matiere'>
            <label htmlFor="matiere">Matière:</label>
            <input
              type="matiere"
              id="matiere"
              name="matiere"
              value={formData.matiere}
              onChange={handleInputChange}
              placeholder='Matiere produit'
            />
          </div>

          < div className='prix'>
            <label htmlFor="prix">Prix:</label>
            <input
              type="prix"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleInputChange}
              placeholder='Prix produit'
            />
          </div>

          < div className='code'>
            <label htmlFor="code">Code:</label>
            <input
              type="code"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder='code produit'
            />
          </div>

          < div className='thumbnail-product'>
            <label htmlFor="thumbnail-product">Thumbnail:</label>
            <input
              type="file" //permet de créer un bouton pour choisir un fichier en local
              id="thumbnail-product"
              name="thumbnail-product"
              accept="image/*"//seul les images sont séléctionnables
              value={formData.thumbnail}
              // onChange={handleImageChange}
              placeholder='Image produit'
            />
          </div>

          <button className="btn-submit" type="submit">Submit</button>
        </form>
      </div>

      <Footer />

    </>

  )
}
