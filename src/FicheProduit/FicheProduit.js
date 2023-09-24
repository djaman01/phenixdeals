import { useParams } from "react-router-dom";


import { produits } from "../Produits/produits";

export default function FicheProduit() {

  //Ici on va utiliser le react Hook useParams afin d'accéder à la fin de l'url = parametre, que nous avons défini comme étant l'id de chaque objet
  const { param } = useParams();

  //En accédant aux id des objets,(le 1er id ayant numéro 1 et non pas 0 car id=0 est à éviter, on va faire param-1, car 1er element est le 0), 
  //on pourra ainsi accéder à chaque élement de l'array movies et donc à chaque objet et on store dans une variable qu'on appel tableau

  const produit = produits[param - 1]

  //Ainsi, on pourra facilement accéder aux propriétés de chaque objet et les utiliser
  return (
    <div className="fiche-produit">
      <div>
        <h1>{produit.thumbnail}</h1>
        <img className="img-s7" src={produit.thumbnail} alt={produit.détails} />
        <img className="img-s7" src={produit.thumbnail3} alt={produit.détails} />
      </div>

      <div>
        <h2 className="movie-description">{produit.détails}</h2>
      </div>

      <div className="buttons">
        <div className="home-button">

        </div>

      </div>
    </div>
  )
}