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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: imageFile,
    });
  };

  const handleSubmit = async (e) => {

    //création objet pour envoyer fichier json
    const formData = new FormData();
    formData.append("nom", formData.nom);
    formData.append("thumbnail", formData.thumbnail);

    try {
      const response = await fetch("http://localhost:3005/tableau", {
        method: "POST",
        body: formData, // Use the FormData object
      });

      if (response.status === 201) {
        console.log("Tableau record added successfully");
        setFormData({
          nom: "",
          thumbnail: ""
        });
      } else {
        console.error("Error adding Tableau record");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="titre-page">
        <h1> Tous nos Tableaux </h1>
      </div>
      <div>
        <h2 className="add-tableau">Add New Tableau</h2>

        <form onSubmit={handleSubmit}>

          < div className='nom'>
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              placeholder='nom du produit'
            />
          </div>

          < div className='dimensions'>
            <label htmlFor="dimensions">Dimensions:</label>
            <input
              type="text"
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

          < div className='thumbnail'>
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input
              type="file" //permet de créer un bouton pour choisir un fichier en local
              id="thumbnail"
              name="thumbnail"
              accept="image/*"//seul les images sont séléctionnables
              value={formData.thumbnail}
              onChange={handleImageChange}
              placeholder='Image produit'
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />

    </>

  )
}
