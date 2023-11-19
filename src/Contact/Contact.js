import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import axios from 'axios'
import { useState } from 'react';
import './contact.css'

export default function Contact() {

  const alertFormulaire = () => alert('Formulaire Envoyé ! Nous vous répondrons dès que possible')

  //Comme on a 1 form, on veut tout envoyé en 1 fois
  //state variable qui aura la value de l'input et qui est un objet avec plusieurs properties pour mettre dans différents input
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Ville: "",
    Mail: "",
    Telephone: "",
    Aide: ""
  });

  //onChange={handleChange} Va être écrit dans tous les inputs, pour en prendre les values écrites et les stores dans les states variables respectives
  //const { name, value } = e.target; is using destructuring assignment to extract the name and value properties from the input objects that contains the onChange
  const handleChange = (e) => {
    const { name, value } = e.target; //e.target = extrait name et value (ici defaultValue) ecrite par l'user, de tous les input fields avec onChange={handleChange} 
    setFormData({...formData, [name]: value, }); //...formData recrée une copie de l'objet formData et [name]:value, remplace les values pour chaque property
  };

  //Will be called on the form attribute onSubmit={handleSubmit}
  //Création de l'API avec HTTP method .post 
  //On peut mettre .preventDefault() pour pas que le form se rafraichisse par défaut quand on appuie sur submit, mais je veux qu'il se rafraichisse donc je ne le mets pas

  const handleSubmit = async (e) => {
    //e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/', formData);

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
