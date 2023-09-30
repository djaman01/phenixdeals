import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({ type, détails, prix, thumbnail, id }) {
  return (
    <div class="container">

      <div className="item">

        <Link to={`/ficheproduit/${id}`} className='link'>

          <div className="div-thumbnail">
            <img className="thumbnail" src={thumbnail} alt={détails} />
          </div>

          <div className="text-product">
            <h3 className='product-title'>{type}</h3>
            <h4 className='product-details'>{détails}</h4>
            <h4 className='product-price'>{prix}</h4>
            <button className="product-button">Plus de Détails</button>
          </div>

        </Link>
      </div>

    </div>
  )
}
