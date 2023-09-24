import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({artist, dimensions, thumbnail, id}) {
  return (
    <div class="section7-container">
    

      <div className="item-s7">
      <Link to={`/fichetableau/${id}`}> 

        <div className="image-s7">
          
            <img className="img-s7" src={thumbnail} alt={artist} />
      
        </div>
        <div className="text-s7">
          <h3>{artist}</h3>
          <span>{dimensions}</span>
          <button className="button-s7">Plus de Détails</button>
        </div>

        </Link>



      </div>
    </div>
  )
}
