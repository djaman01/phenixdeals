import './header.css'
import Filter from '../Filter/Filter.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
{/* On rajoute la class "open" à "header" si on clique sur le menu hamburger; sinon on rajoute rien */}
      <div className={`header ${isOpen ? 'open' : ''}`}>
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

            <h4 className='vendre-btn'>Acheter</h4>


            <div className="dropdown">
              <Link to='/getproduct' style={{ textDecoration: "none" }}>
                <p className="drop-btn">Tous les produits</p>
              </Link>
              <Link to='/tableaux' style={{ textDecoration: "none" }}>
                <p className="drop-btn">Tableaux</p>
              </Link>
              <Link to='/decoration' style={{ textDecoration: "none" }}>
                <p className="drop-btn">Décoration</p>
              </Link>
              <Link to='/bijoux' style={{ textDecoration: "none" }}>
                <p className="drop-btn">Bijoux</p>
              </Link>

              <Link to='/livres' style={{ textDecoration: "none" }}>
                <p className="drop-btn">Livres</p>
              </Link>
            </div>
          </div>

          <div className="div-dropdown">
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <h4 className='vendre-btn'>Vendre</h4>
            </Link>
          </div>

          <div className="div-dropdown">
            <Link to="/concept" style={{ textDecoration: "none" }}>
              <h4 className='vendre-btn'>Concept</h4>
            </Link>
          </div>

          

        </div>

        {/* Si isOpen est true, ça ajoute une nouvelle classe "open" en + de la classname "hamburger-menu"; sinon ça n'ajoute rien */}
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>



      </div>
    </>
  )
}
