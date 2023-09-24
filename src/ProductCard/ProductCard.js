import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({type, détails, thumbnail, code, id}) {
  return (
    <div class="container">
    

      <div className="item">
      <Link to={`/ficheproduit/${id}`}> 

        <div className="div-image">
            <img className="image" src={thumbnail} alt={détails} />
        </div>
        
        <div className="text-s7">
          <h3>{type}</h3>
          <h4>{détails}</h4>
          <h4>{code}</h4>
          <button className="button">Plus de Détails</button>
        </div>

        </Link>
      </div>

    </div>
  )
}
