import './header.css'
import Filter from '../Filter/Filter.js'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <>

      <div className="header">
        <Link to='/addProduct'>
          <div className="logo-header">
            <img className="logo" src="../logo-bon.jpg" alt="logo-phenix" />
          </div>
        </Link>

        <div className="navbar">
          <Link to='/' className='home-link'>
            <h4 className='home-button'>Accueil</h4>
          </Link>

          <div className="div-dropdown">
            <Link to='/getproduct' style={{textDecoration: "none"}}>
              <h4 className='page-selection'>Acheter</h4>
            </Link>
            <div className="dropdown">
              <Link to='/tableaux' style={{textDecoration: "none"}}>
                <p className="drop-btn">Tableaux</p>
              </Link>
              <Link to='/decoration' style={{textDecoration: "none"}}>
                <p className="drop-btn">Décoration</p>
              </Link>
              <Link to='/bijoux' style={{textDecoration: "none"}}>
                <p className="drop-btn">Bijoux</p>
              </Link>

              <Link to='/livres' style={{textDecoration: "none"}}>
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
        
      </div>
    </>
  )
}
