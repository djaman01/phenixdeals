import './productCard.css'

export default function ProductCard({artist, dimensions, thumbnail, thumbnail_width, thumbnail_height, id}) {
  return (
    <div class="section7-container">
    

      <div className="item-s7">

        <div className="image-s7">
          <Link to={`/Links/${id}`}> 
            <img className="img-s7" src={thumbnail} alt={title} style={{ width: thumbnail_width, height: thumbnail_height }} />
          </Link>
        </div>
        <div className="text-s7">
          <h3>{artist}</h3>
          <span>{dimensions}</span>
          <button className="button-s7">Plus de Détails</button>
        </div>


      </div>
    </div>
  )
}
