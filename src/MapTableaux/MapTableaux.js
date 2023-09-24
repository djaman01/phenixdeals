import ProductCard from "../ProductCard/ProductCard";
import { tableaux } from "../Tableaux/tableaux";
import './mapTableaux.css'




export default function MapTableaux() {

  return (
    <div className="grid-filter">
      {tableaux.map((e, i) => <ProductCard {...e} key={i} />)}
    </div>
  )
}

