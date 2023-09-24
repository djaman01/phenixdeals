import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({type, détails, thumbnail, code, id}) {
  return (
    <div class="container">
    

      <div className="item-s7">
      <Link to={`/ficheproduit/${id}`}> 

        <div className="image-s7">
            <img className="img-s7" src={thumbnail} alt={détails} />
        </div>
        
        <div className="text-s7">
          <h3>{type}</h3>
          <h4>{détails}</h4>
          <h4>{code}</h4>
          <button className="button-s7">Plus de Détails</button>
        </div>

        </Link>
      </div>

    </div>
  )
}
