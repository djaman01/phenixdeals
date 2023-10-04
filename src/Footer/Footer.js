import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { SocialIcon } from 'react-social-icons'

export default function Footer() {
  return (
    <div className='footer-container'>

      <div className='abonnement'>
        <h4>Abonnez-vous à nos réseaux sociaux</h4>
      </div>

      <div className='phenix-mot'>
        <h4>Phenixdeals.com est un espace où vous pouvez mettre en vente vos objets d'art, de décoration ou vos bijoux</h4>
      </div>

      <div className='liens-footer'>
        <h4 style={{ color: "black" }}>Liens</h4>
        <h5>Tableaux</h5>
        <h5>Décoration</h5>
        <h5>Bijoux</h5>
        <h5>Livres</h5>
      </div>

      <div className='contact-footer'>
        <h4 style={{ color: "black" }}>Contact</h4>
        <div>
          <span><FontAwesomeIcon icon={faHouse} style={{ color: "#404544" }} /> </span>
          <span>Casablanca, Maroc</span>
        </div>
        <div style={{ marginTop: 20 }}>
          <span><FontAwesomeIcon icon={faEnvelope} style={{ color: "#404544" }} /> </span>
          <span> phenix.deals@gmail.com</span>
        </div>
      </div>

      <div className='reseaux-footer'>
        <span><SocialIcon url="https://www.instagram.com/phenixdeals/" />  </span>
        <span style={{ marginLeft: 20 }}><SocialIcon url="https://web.facebook.com/profile.php?id=100090243464213" />  </span>
      </div>
    </div>
  )
}
