import { Link, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useState, useEffect } from "react";
import axios from "axios";

export default function FicheDatabase() {
  const { productId } = useParams();

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
          <div className="grid-tableaux">
            <div className="item-tableaux">
              <div className="div-thumbnail-tableaux">
                <img
                  className='thumbnail-tableaux'
                  src={`http://localhost:3005/${product.imageUrl}`}
                  alt={product.nom}
                />
              </div>
              <div className="text-tableaux">
                <h3 className='tableaux-type'>{product.type}</h3>
                <div className='tableaux-nom-dimensions'>
                  <h4 style={{ fontSize: "15px" }}>{product.nom}/</h4>
                  <h4 style={{ fontSize: "15px" }}>{product.dimensions}</h4>
                </div>
                <h4 className='tableaux-matiere' style={{ fontSize: "15px" }}>{product.matiere}</h4>
                <h4 className='tableaux-price'>{product.prix}</h4>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
