
import './homeTitle.css'
import { produits } from "../Produits/produits";
import { useState } from 'react';
import ProductCard from "../ProductCard/ProductCard";


export default function HomeTitle() {

  const [product, setProduct] = useState('');

  const inputValue = (e) => setProduct(e.target.value);

  const filterType = produits.filter((elm) => elm.type.toLowerCase().includes(product.toLowerCase()));

  return (
    <>
      <div class="div-title-home">

        <h1>
          Nouveaux Produits
        </h1>
        <div>
          <input value={product} onChange={inputValue} placeholder="Tableaux, meubles, bijoux" type="text" />
        </div>

      </div>

      <div className="grid-home-filter">

        {filterType.map((e, i) => <ProductCard {...e} key={i} />)}

      </div>

    </>
  )
}
