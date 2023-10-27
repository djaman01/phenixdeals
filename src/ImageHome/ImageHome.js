import { Link } from 'react-router-dom'
import './imageHome.css'

import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';




export default function ImageHome() {

  
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 1500,
      easing: 'ease-in-out',
    
    });
  })

  return (
    <div className='all-img-home'>
      <div className='div-img-home' data-aos="fade-left">
        <Link to="/concept">
          <img src="/imagesTableaux/salon-galerie.jpg" alt="home-slide" className="image-home" />
        </Link>
      </div>
    </div>
  )
}
