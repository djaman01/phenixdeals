import './productCard.css'

import { Link } from "react-router-dom";

export default function ProductCard({ type, détails, prix, thumbnail, id }) {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (

    <Link to={`/ficheproduit/${id}`} className='link' onClick={scrollToTop}>

      <div className="item">

        <div className="div-thumbnail">
          <img className="thumbnail" src={thumbnail} alt={détails} />
        </div>

        <div className="text-product">
          <h3 className='product-type'>{type}</h3>
          <h4 className='product-details'>{détails}</h4>
          <h4 className='product-price'>{prix}</h4>
        </div>

      </div>

    </Link>

  )
}
