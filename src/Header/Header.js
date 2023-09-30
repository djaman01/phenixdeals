import './header.css'
import Filter from '../Filter/Filter.js'
import { Link } from 'react-router-dom'



export default function Header() {
  return (
    <>

      <div className="header">

        <div className="logo-header">
          <img className="logo" src="../logo-bon.jpg" />
        </div>

        <div className="navbar">
          <Link to='/accueil'>
          <a>Accueil</a>
          </Link>

          <div className="div-dropdown">

            <a>Acheter</a>
            <div className="dropdown">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </div>
          </div>
          <div className="div-dropdown">
            <a>Vendre</a>
            <div className="dropdown">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </div>
          </div>
          <div className="div-dropdown">
            <a>Contact</a>
            <div className="dropdown">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </div>
          </div>

        </div>

        <div>
          <Filter />
        </div>

      </div>
    </>
  )
}
