import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import axios from 'axios'
import { useState } from 'react';
import './contact.css'

export default function Contact() {

  //state variable qui aura la value de l'input et qui est un objet avec plusieurs properties pour mettre dans différents input
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Ville: "",
    Mail: "",
    Telephone: "",
    Aide: ""
  });


  // Arrow function qui est l'event handler = Elle sera activé quand un event sera triger (ici le onChange de l'input)
  // Elle donnera des values à la state variable formData avec setFormData en fonction des values de l'input que donnera l'user
  //[name] = keyName de la properties de la state variable formData et value= value des properties de l'objet formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Création de l'API avec la Request POST
  //Will be called on the form attribute onSubmit={handleSubmit}
  //On peut mettre .preventDefault() pour pas que le form se rafraichisse par défaut quand on appuie sur submit, mais je veux qu'il se rafraichisse donc je ne le mets pas

  const handleSubmit = async (e) => {
    //e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/', formData);
      
      console.log('Response from the server:', response.data);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };
  
  return (


    <>

      <Header />

      <div className="all-form">
        <h2 className='merci-form'>Merci de remplir le formulaire ci-dessous:</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="first-column">

              < div className='nom-famille'>
                <label htmlFor="Nom">Nom:</label>
                <input
                  type="text"
                  id="Nom"
                  name="Nom"
                  value={formData.Nom}
                  onChange={handleChange}
                  placeholder='Nom'
                  required
                />
              </div>

              <div className='prenom'>
                <label htmlFor="Prenom">Prénom:</label>
                <input
                  type="text"
                  id="Prenom"
                  name="Prenom"
                  value={formData.Prenom}
                  onChange={handleChange}
                  placeholder='Prénom'
                  required
                />
              </div>

              <div className='ville'>
                <label htmlFor="Ville">Ville:</label>
                <input
                  type="text"
                  id="Ville"
                  name="Ville"
                  value={formData.Ville}
                  onChange={handleChange}
                  placeholder='ville'
                  required
                />
              </div>

              <div className='mail'>
                <label htmlFor="Mail">E-mail:</label>
                <input
                  type="text"
                  id="Mail"
                  name="Mail"
                  value={formData.Mail}
                  onChange={handleChange}
                  placeholder='Votre e-mail'
                  required
                />
              </div>

              <div className='telephone'>
                <label htmlFor="Telephone">Téléphone:</label>
                <input
                  type="text"
                  id="Telephone"
                  name="Telephone"
                  value={formData.Telephone}
                  onChange={handleChange}
                  placeholder='Numéro de Téléphone'
                  required
                />
              </div>

            </div>

            <div className="second-column">

              <div className="text-area-form">
                <label htmlFor="aide">En quoi pouvons-nous vous aider ?</label>
                <textarea value={formData.Aide}
                  onChange={handleChange}
                  name="Aide" 
                  id="aide" 
                  cols="60" 
                  rows="10" 
                  placeholder="Ecrivez votre texte ici"> </textarea>
              </div>

              <div className='news-btn'>

                <h3 style={{ textDecoration: "underline", marginBottom: "" }}>Voulez-vous recevoir nos nouveautés par mail ?</h3>

                <label htmlFor="oui" style={{ display: "inline-block" }}> Oui </label>
                <input type="radio" name="check" id="oui" style={{ marginRight: "50px" }} required />

                <label htmlFor="non" style={{ display: "inline-block" }}> Non </label>
                <input type="radio" name="check" id="non" required />

              </div>

            </div>

          </div>

          <div class="form-button">
            <button id='submitcheck' type="submit" className="submit-btn">Submit</button>
            <button type="reset" className='reset-btn'> Reset </button>
          </div>

        </form>

      </div>

      <Footer />
    </>

  )
}
