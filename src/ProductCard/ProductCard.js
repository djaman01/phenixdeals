import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({ type, détails, prix, thumbnail, id, matiere }) {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (

    <Link to={`/ficheproduit/${id}`} className='link' onClick={scrollToTop}>

      <div className="item-ajout-recent">

        <div className="div-thumbnail">
          <img className="product-thumbnail" src={thumbnail} alt={détails} />
        </div>

        <div className="text-product">
          <h3 className='product-type'>{type}</h3>
          <h4 className='product-details' style={{fontSize: "15px"}}>{détails}</h4>
          <h4 className='product-matiere' style={{fontSize: "15px"}}>{matiere}</h4>
          <h4 className='product-price'>{prix}</h4>
        </div>

      </div>

    </Link>

  )
}
