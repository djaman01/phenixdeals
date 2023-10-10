import './header.css'
import Filter from '../Filter/Filter.js'
import { Link } from 'react-router-dom'



export default function Header() {
  return (
    <>

      <div className="header">
      <Link to='/'>
        <div className="logo-header">
          <img className="logo" src="../logo-bon.jpg" alt="logo-phenix" />
        </div>
        </Link>

        <div className="navbar">
          <Link to='/' className='home-link'>
            <h4 className='home-button'>Accueil</h4>
          </Link>

          <div className="div-dropdown">
            <h4 className='page-selection'>Acheter</h4>
            <div className="dropdown">
              <p className="drop-btn">Tableaux</p>
              <p className="drop-btn">Décoration</p>
              <p className="drop-btn">Bijoux</p>
              <p className="drop-btn">Livres</p>
            </div>
          </div>

          <div className="div-dropdown">
            <h4 className='vendre-btn'>Vendre</h4>
          </div>

          <div className="div-dropdown">
            <Link to="/contact" style={{textDecoration: "none"}}>
              <h4 className='contact-btn'>Contact</h4>
            </Link>
          </div>

        </div>

        <div>
          <Filter />
        </div>

      </div>
    </>
  )
}
