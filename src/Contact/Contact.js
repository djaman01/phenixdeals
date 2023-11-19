import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import axios from 'axios'
import { useState } from 'react';
import './contact.css'

export default function Contact() {

  const alertFormulaire = () => alert('Formulaire Envoyé ! Nous vous répondrons dès que possible')

  //Pour envoyes les values des inputs du form en 1 fois: On crée un objets avec les properties correspondant aux valeus des inputs
  //Puis dans les input on fera par ex: value={formData.Nom}
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Ville: "",
    Mail: "",
    Telephone: "",
    Aide: ""
  });

  //onChange={handleChange} Va être écrit dans tous les inputs du form pour mettre à jour les values des properties du state
  const handleChange = (e) => {
    const { name, value } = e.target; //e.target => extrait name et value (ici defaultValue) ecrits par l'user
    setFormData({...formData, [name]: value, }); //...formData recrée une copie de l'objet formData et [name]:value, remplace les values pour chaque property
  };

  //form onSubmit={handleSubmit}
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/contact', formData);//on envoie toutes les properties en 1 fois avec la state formData qui est un objet avec toutes les properties et values entrés par l'user

      console.log('Response from the server:', response.data);
    } 
    catch (error) {

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

              <div className='nom-famille'>
                <label className='contact-form-label' htmlFor="Nom">Nom:</label>
                <input
                  className='contact-form-input'
                  type="text"
                  id="Nom"
                  name="Nom"
                  defaultvalue={formData.Nom} //car avec value, ca ne reset pas
                  onChange={handleChange}
                  placeholder='Nom'
                  required
                />
              </div>

              <div className='prenom'>
                <label className='contact-form-label' htmlFor="Prenom">Prénom:</label>
                <input
                  className='contact-form-input'
                  type="text"
                  id="Prenom"
                  name="Prenom"
                  defaultvalue={formData.Prenom}
                  onChange={handleChange}
                  placeholder='Prénom'
                  required
                />
              </div>

              <div className='ville'>
                <label className='contact-form-label' htmlFor="Ville">Ville:</label>
                <input
                  className='contact-form-input'
                  type="text"
                  id="Ville"
                  name="Ville"
                  defaultvalue={formData.Ville}
                  onChange={handleChange}
                  placeholder='ville'
                  required
                />
              </div>

              <div className='mail'>
                <label className='contact-form-label' htmlFor="Mail">E-mail:</label>
                <input
                  className='contact-form-input'
                  type="text"
                  id="Mail"
                  name="Mail"
                  defaultvalue={formData.Mail}
                  onChange={handleChange}
                  placeholder='Votre e-mail'
                  required
                />
              </div>

              <div className='telephone'>
                <label className='contact-form-label' htmlFor="Telephone">Téléphone:</label>
                <input
                  className='contact-form-input'
                  type="text"
                  id="Telephone"
                  name="Telephone"
                  defaultvalue={formData.Telephone}
                  onChange={handleChange}
                  placeholder='Numéro de Téléphone'
                  required
                />
              </div>

            </div>

            <div className="second-column">

              <div className="all-text-area">
                <label className='contact-form-label' htmlFor="aide">Que souhaitez-vous vendre ?</label>
                <textarea className='contact-text-area'  defaultvalue={formData.Aide}
                  onChange={handleChange}
                  name="Aide"
                  id="aide"
                  cols="60"
                  rows="15"
                  placeholder="Ecrivez votre texte ici"> </textarea>
              </div>

            </div>

          </div>

          <div className="form-button">
            <button onClick ={alertFormulaire} id='submitcheck' type="submit" className="submit-btn">Envoyer</button>
            <button type="reset" className='reset-btn'> Reset </button>
          </div>

        </form>

      </div>

      <Footer />
    </>

  )
}
