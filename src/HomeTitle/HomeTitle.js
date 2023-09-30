
import './homeTitle.css'
import { produits } from "../20Produits/20produits";
import { useState } from 'react';
import ProductCard from "../ProductCard/ProductCard";


export default function HomeTitle() {

  const [product, setProduct] = useState('');

  const inputValue = (e) => setProduct(e.target.value);

  const filterType = produits.filter((elm) => elm.type.toLowerCase().includes(product.toLowerCase()));

  return (
    <>
      <div class="div-title-home">

        <h1 className='home-title'>
          Les 20 Nouveaux produits
        </h1>
        <div className='input-home'>
          <input value={product} onChange={inputValue} placeholder="Tableau, déco, bijou, livre" type="text" />
        </div>

      </div>

      <div className="grid-home-filter">

        {filterType.map((e, i) => <ProductCard {...e} key={i} />)}

      </div>

    </>
  )
}
