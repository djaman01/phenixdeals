import { Link } from 'react-router-dom'
import './mapCardModel.css'

//Il faut mettre les props que pour error et la function sur laquelle on map et non pas les elements à l'intérieur

export default function MapCardModel({error, filteredProducts}) {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <>
      <div className='all-card-products'>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-all-products" data-aos='zoom-in'>
            {/* il faut uiliser filteredProducts.map car on va filtrer avec searchbar dans cette array d'objet  */}
            {filteredProducts.map((item) => (

              <Link className="allproducts-div-link" onClick={scrollToTop} to={`/fichedatabase/${item._id}`}>

                <div className="item-all-products">

                  <div className="div-thumbnail-allproducts">
                    <img
                      className='thumbnail-products'
                      src={`http://localhost:3005/${item.imageUrl}`}//On store le path de l'image dans la database,, donc c'est ce qu'il faut chercher
                      alt={item.nom}
                    />
                  </div>


                  <div className="text-all-products">

                    <h3 className='all-products-type'>{item.type}</h3>

                    <div className='nom-dimensions'>
                      <h4 style={{ fontSize: "15px" }}>{item.nom}/</h4>
                      <h4 style={{ fontSize: "15px" }}>{item.dimensions}</h4>
                    </div>
                    <h4 className='all-products-matiere' style={{ fontSize: "15px" }}>{item.matiere}</h4>

                    <h4 className='all-products-price'>{item.prix}</h4>

                  </div>

                </div>
              </Link>

            ))}

          </div>
        )}
      </div>
    </>
  )
}
