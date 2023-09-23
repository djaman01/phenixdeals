import './header.css'
import Filter from '../Filter/Filter.js'

export default function Header() {
  return (
    <>
    
    <div className="header">

      <div className="logo-header">
        <img className="logo" src="logo-phenixdeals.jpg" />
      </div>

      <div className="navbar">

      <div className="div-dropdown">
          <a>Acheter</a>
          <div className="dropdown">
            <p>Marketing & PR</p>
            <p>Customer Success & Sales</p>
            <p>IT, Product, Data</p>
            <p>Finance & Administration</p>
            <p>HR & More</p>
          </div>
        </div>
        <div className="div-dropdown">
          <a>Vendre</a>
          <div className="dropdown">
            <p>Marketing & PR</p>
            <p>Customer Success & Sales</p>
            <p>IT, Product, Data</p>
            <p>Finance & Administration</p>
            <p>HR & More</p>
          </div>
        </div>
        <div className="div-dropdown">
          <a>Contact</a>
          <div className="dropdown">
            <p>Marketing & PR</p>
            <p>Customer Success & Sales</p>
            <p>IT, Product, Data</p>
            <p>Finance & Administration</p>
            <p>HR & More</p>
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
