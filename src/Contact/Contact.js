import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import './contact.css'

export default function Contact() {
  return (

    <>

      <Header />

      <div class="all-form">
        <h2>Merci de remplir le formulaire ci-dessous:</h2>

        <form>

          <div class="form-grid">

            <div class="first-column">
              <div>
                <label for="nom" class="nom"> Nom </label>
                <input type="text" name="nom" id="nom" placeholder="Nom de famille" />
              </div>

              <div>
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" placeholder="Prénom" />
              </div>

              <div>
                <label for="ville">Ville</label>
                <input type="text" id="ville" name="ville" />
              </div>

              <div>
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="votre e-mail" />
              </div>

            </div>

            <div class="second-column">

            
              <div class="text-area">
                <label for="aide">En quoi pouvons-nous vous aider ?</label>
                <textarea name="aide" id="aide" cols="30" rows="5" placeholder="Ecrivez votre text ici"></textarea>
              </div>

             
            </div>

          </div>

          <div class="button-div">
            <button type="reset"> Reset</button>
            <button id='submitcheck' type="submit" class="submit">Submit</button>

          </div>

        </form>

      </div>

      <Footer />
    </>

  )
}
