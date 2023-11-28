import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import { SocialIcon } from 'react-social-icons'

export default function Footer() {
  return (

    <div className='footer-container'>
      <div className='top-footer'>

        <div className='abonnement'>
          <h4>Abonnez-vous à nos réseaux sociaux: </h4>
          <div className='social-icons'>
          <span><SocialIcon url="https://www.instagram.com/phenixdeals/" target="_blank" />  </span>
          <span style={{ marginLeft: 20 }}><SocialIcon url="https://web.facebook.com/profile.php?id=100090243464213" target="_blank" />  </span>
          </div>
        </div>


        <div className='contact-footer'>
          <h4 className="contact-title" style={{ color: "black" }}>Contact: </h4>
          <div>
            <span><FontAwesomeIcon icon={faHouse} style={{ color: "#404544" }} /> </span>
            <span>Casablanca, Maroc</span>
          </div>
          <div style={{ marginTop: 20 }}>
            <span> <FontAwesomeIcon icon={faPhone} style={{ color: "#404544" }} /> </span>
            <span> 06-19-63-53-36 </span>
          </div>
          <div style={{ marginTop: 20 }}>
            <span><FontAwesomeIcon icon={faEnvelope} style={{ color: "#404544" }} /> </span>
            <span> phenix.deals@gmail.com</span>
          </div>
        </div>

      </div>

      <div className='copyright'>
        <span>Copyright © - Phenixdeals </span>
      </div>

    </div>


  )
}
