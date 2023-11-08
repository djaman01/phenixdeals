import { Link, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./ficheDatabase.css"

export default function FicheDatabase() {

  const { productId } = useParams(); //pour pouvoir catcher le endpoint de l'url

  //Since i want to fetch a single product by its ID, there's no need for an array or mapping in the return statement.
  const [product, setProduct] = useState(null);

  const [error, setError] = useState('');

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = () => {

      axios.get(`http://localhost:3005/article/${productId}`)
        .then((response) => {
          console.log("article fetched", response.data);
          setProduct(response.data); // Set the current product

          // Fetch related products based on the product's name
          axios.get(`http://localhost:3005/related-products/${response.data.nom}`) //J'utilise la réponse du 1er Get pour accéder à la property nom et ne selectionner que les produits qui ont le même nom
            .then((relatedResponse) => {
              console.log("related products fetched", relatedResponse.data);
              setRelatedProducts(relatedResponse.data);
            })
            .catch((relatedError) => {
              console.error('Error fetching related products:', relatedError);
            });
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, [productId]);


  //State pour gérer visibilité partie réservée et autres produits quand boutons sont cliqués
  const [reserveClicked, setReserveClicked] = useState(false);

  const [autresProduits, setAutresProduits] = useState(false);

  //Pour donner une référence aux DOM elements et pouvoir les cibler avec variableName.current
  const refReservePart = useRef(null)

  const refAutresPart = useRef(null)

  //Quand cette function va etre appelé, la state deviendra = true et ca scroll a la Reservepart
  const handleReserveClicked = () => {
    setReserveClicked((prevState) => !prevState); //prevState cible la valeur par défaut du state
    refReservePart.current.scrollIntoView({ behavior: "smooth" }) //reservePartRef.current gives direct access to the DOM element that the ref is attached to
  }

  const handleAutresClicked = () => {
    setAutresProduits((prevState) => !prevState); //prevState cible la valeur par défaut du state
    refAutresPart.current.scrollIntoView({ behavior: "smooth" }) //reservePartRef.current gives direct access to the DOM element that the ref is attached to
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <>
      <Header />
      <div>
        {error ? (<p>Error: {error}</p>) : product ? (

          <div className="fiche-produit">

            <div className="div-image-fiche">
              <img src={`http://localhost:3005/${product.imageUrl}`} alt={product.détails} className="image-fiche" />
            </div>


            <div className="commentaires-produit">
              <h1 className="fiche-nom-produit">{product.auteur}</h1>
              <h2 className="fiche-info-produit">{product.infoProduit}</h2>
              <h2 className="fiche-prix-produit">{product.prix}</h2>
              <h3 className="fiche-code-produit">Réf: {product.code}</h3>

              <div className="btn-produit">
                <button className="btn-réserver" onClick={handleReserveClicked}>Réserver</button>
                <button className="btn-autre-produit" onClick={handleAutresClicked}>Voir d'autres {product.nom}</button>
              </div>

              <div className="reserve-part" ref={refReservePart} > {/*ref={reservePartRef} associate the reservePartRef with this DOM element. */}
                {reserveClicked === true &&

                  <div className="whatsapp-div" >
                    <p style={{ paddingTop: "7px" }}> Envoyez-nous un message whatsapp avec la référence du produit :</p>

                    <a className="link-whatsapp" href="https://api.whatsapp.com/send?phone=212619635336&text=Bonjour%2C%0AJe%20suis%20int%C3%A9ress%C3%A9%20par%20un%20produit%20vu%20sur%20phenixdeals.com.%0ALa%20r%C3%A9f%C3%A9rence%20du%20produit%20est%3A%20" target="_blank">
                      <button className="whatsapp-button"> Whatsapp </button>
                    </a>
                  </div>
                }
              </div>


            </div>

          </div>
        ) : null}
      </div>

      {/* Apparait when "autreProduits" state is true, quand on clique sur voir autres produits */}
      <div className="autres-product" ref={refAutresPart}>
        {(autresProduits === true && relatedProducts.length > 1) ? (
          <div className="grid-all-products">
            {relatedProducts //state avec tous les produits ac même nom
              .filter((relatedProduct) => relatedProduct._id !== product._id)//Ne garde que les produits avec ._id différent du produit cliqué Puis .map sur eux pour les afficher
              .map((relatedProduct) => (
                <Link onClick={scrollToTop} to={`/fichedatabase/${relatedProduct._id}`} key={relatedProduct._id}>
                  <div className="item-fichedb">
                    <div className="div-thumbnail-allproducts">
                      <img
                        className="thumbnail-products"
                        src={`http://localhost:3005/${relatedProduct.imageUrl}`}
                        alt={relatedProduct.nom}
                      />
                    </div>
                    <div className="text-all-products">
                      <h3 className="all-products-type">{relatedProduct.type}</h3>
                      <div className="nom-dimensions">
                        <h4 style={{ fontSize: "15px" }}>{relatedProduct.nom}/</h4>
                        <h4 style={{ fontSize: "15px" }}>{relatedProduct.dimensions}</h4>
                      </div>
                      <h4 className="all-products-matiere" style={{ fontSize: "15px" }}>
                        {relatedProduct.matiere}
                      </h4>
                      <h4 className="all-products-price">{relatedProduct.prix}</h4>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ) :
          (
            (autresProduits === true && relatedProducts.length == 1) ? <div className="no-other-products"><p>Pas d'autres produits de: <span style={{ color: "#0072B5" }}>{product.nom}</span></p></div> : null
          )

        }
      </div>

      <Footer />
    </>
  );
}
