import { useParams } from "react-router-dom";
import Header from '../Header/Header' //Il faut donner les même className pour avoir le même style, sans importer le css
import './ficheProduit.css'


import { produits } from "../Produits/produits";

export default function FicheProduit() {

  //Ici on va utiliser le react Hook useParams afin d'accéder à la fin de l'url = parametre, que nous avons défini comme étant l'id de chaque objet
  const { id } = useParams();

  //En accédant aux id des objets,(le 1er id ayant numéro 1 et non pas 0 car id=0 est à éviter, on va faire param-1, car 1er element est le 0), 
  //on pourra ainsi accéder à chaque élement de l'array movies et donc à chaque objet et on store dans une variable qu'on appel tableau

  const produit = produits[id-1];

  //Ainsi, on pourra facilement accéder aux propriétés de chaque objet et les utiliser
  return (
    <>
      {/* Le header bouge d'une page à l'autre, car il ya dans la page d'accueil une srcoll bar à droite qui prend la place */}
      <Header />

      <div className="fiche-produit">

        <div className="div-image-fiche">
          <img className="image-fiche" src={produit.thumbnail} alt={produit.détails} />
        </div>

        <div className="infos-produit">
          <h1>{produit.état}</h1>
          <h1>{produit.nom}</h1>
          <h2>{produit.dimensions}</h2>
          <h2>{produit.matière}</h2>
          <h2>{produit.prix}</h2>
          <h3>{produit.code}</h3>
          
          <button>Voir d'autres {produit.nom}</button>

          <button>Acheter</button>

        </div>

      

      

      </div>

    </>
  )
}