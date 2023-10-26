import { Link, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useState, useEffect } from "react";
import axios from "axios";

export default function FicheDatabase() {
  const { productId } = useParams(); //pour pouvoir catcher le endpoint de l'url

  //Since i want to fetch a single product by its ID, there's no need for an array or mapping in the return statement.
  const [product, setProduct] = useState(null);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:3005/article/${productId}`)
        .then((response) => {
          console.log("article fetched", response.data);
          setProduct(response.data);//valeur Variable product = 1 valeur d'1 produit
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <Header />
      <div>
        {error ? (<p>Error: {error}</p>) : product ? (

<div className="fiche-produit">

<div className="div-image-fiche">
  <img src={`http://localhost:3005/${product.imageUrl}`} alt={product.détails} className="image-fiche" />
</div>


<div className="infos-produit">
  <h1>{product.état}</h1>
  <h1 className="nom-produit">{product.nom}</h1>
  <h2 className="dimensions-produit">{product.dimensions}</h2>
  <h2 className="matiere-produit">{product.matiere}</h2>
  <h2 className="prix-produit">{product.prix}</h2>
  <h3 className="code-produit">{product.code}</h3>

  <div className="btn-produit">
    <Link to="/reserve">
      <button className="btn-réserver">Réserver</button>
    </Link>
    <button className="btn-autre-produit">Voir d'autres {product.nom}</button>
  </div>



</div>

</div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
