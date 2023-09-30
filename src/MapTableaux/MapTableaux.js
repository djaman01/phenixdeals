import ProductCard from "../ProductCard/ProductCard";
import { produits } from "../20Produits/20produits";
import './mapTableaux.css'




export default function MapTableaux() {

  return (
    <div className="grid-filter">
      {produits.map((e, i) => <ProductCard {...e} key={i} />)}
    </div>
  )
}

