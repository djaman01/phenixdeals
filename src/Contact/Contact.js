import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import './contact.css'

export default function Contact() {
  return (

    <>

      <Header />

      <div className="all-form">
        <h2 className='merci-form'>Merci de remplir le formulaire ci-dessous:</h2>

        <form>

          <div className="form-grid">

            <div className="first-column">

              <div className='nom-famille'>
                <label for="nom" className="nom"> Nom </label>
                <input type="text" name="nom" id="nom" placeholder="Nom" />
              </div>

              <div className='prenom'>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" placeholder="Prénom" />
              </div>

              <div className='ville'>
                <label for="ville">Ville</label>
                <input type="text" id="ville" name="ville" placeholder='Ville' />
              </div>

              <div className='mail'>
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="votre e-mail" />
              </div>

              <div className='tel'>
                <label for="tel">Téléphone</label>
                <input type="tel" id="tel" name="tel" placeholder="Numéro de téléphone" />
              </div>

            </div>

            <div className="second-column">

              <div className="text-area-form">
                <label for="aide">En quoi pouvons-nous vous aider ?</label>
                <textarea name="aide" id="aide" cols="60" rows="10" placeholder="Ecrivez votre texte ici"></textarea>
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
