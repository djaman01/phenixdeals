import { useState } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import './tableaux.css'


export default function Tableaux() {
  const [formData, setFormData] = useState({
    nom: "",
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
  e.preventDefault();

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
      <h2>Add New Tableau</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="nom"
          placeholder="nom"
          value={formData.nom}
          onChange={handleInputChange}
        />       
          <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer />

    </>
  
  )
}
