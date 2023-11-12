import { Link } from 'react-router-dom'
import './mapCardModel.css'
import { useState } from 'react';


//Il faut mettre les props que pour error et la function sur laquelle on map et non pas les elements à l'intérieur

export default function MapCardModel({ title, value, onChange, placeholder, error, filteredProducts, paginationStyle }) {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  //Mise en place de la pagination

  const itemsPerPage = 20; //nombre d'item que je veux par page
  const [currentPage, setCurrentPage] = useState(1); //numéros pages

  const indexOfLastItem = currentPage * itemsPerPage; //=20
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;//=0

  //currentItems store nouvelle array avec que les elements entre 0 et 20 exclus donc de 0 à 19 = 20 items
  //On va donc mapper sur cette nouvelle array
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="div-title">
        <h1 className='home-title'>
          {title}
        </h1>
      </div>


      <div className='input-home'>

        <div className="searchbar">
          <div className="searchbar-wrapper">
            <div className="searchbar-left">
              <div className="search-icon-wrapper">
                <span className="search-icon searchbar-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                    </path>
                  </svg>
                </span>
              </div>
            </div>

            <div className="searchbar-center">
              <div className="searchbar-input-spacer"></div>
              <input value={value} onChange={onChange} placeholder={placeholder} className="searchbar-input" title="Search" role="combobox" maxlength="2048" name="q" autocapitalize="off" autocomplete="off" type="text" />
            </div>
          </div>
        </div>

      </div>

      <div className='map-card-products'>
        {error ? (<p>Error: {error}</p>) : (

          <div className="grid-map-products" data-aos='zoom-in'>
            {/* il faut uiliser filteredProducts.map car on va filtrer avec searchbar dans cette array d'objet  */}
            {currentItems.map((item) => (

              <Link className="map-div-link" onClick={scrollToTop} to={`/fichedatabase/${item._id}`}>

                <div className="item-map-products">

                  <div className="div-thumbnail-map-products">
                    <img
                      className='thumbnail-map-products'
                      src={`http://localhost:3005/${item.imageUrl}`}//On store le path de l'image dans la database,, donc c'est ce qu'il faut chercher
                      alt={item.nom}
                    />
                  </div>


                  <div className="div-text-map-products">
                    <h3 className='map-products-type'>{item.type}</h3>
                    <h4 className='info-produit-map'>{item.infoProduit}</h4>
                    <h4 className='map-products-auteur'>{item.auteur}</h4>
                    <h4 className='map-products-price'>{item.prix}</h4>
                  </div>

                </div>
              </Link>
            ))}

            <div className={paginationStyle}>
              {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>

          </div>



        )}
      </div>
    </>
  );
}
