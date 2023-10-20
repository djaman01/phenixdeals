import { Link } from 'react-router-dom'
import './imageHome.css'




export default function ImageHome() {
  return (
    <div className='all-img-home'>
      <div className='div-img-home'>
        <Link to="/concept">
          <img src="/imagesTableaux/salon-galerie.jpg" alt="home-slide" className="image-home" />
        </Link>
      </div>
      <div>
        <Link to="/concept">
          <h1 className='info-concept'> Notre Concept </h1>
        </Link>
      </div>
    </div>
  )
}
