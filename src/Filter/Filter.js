import ProductCard from "../ProductCard/ProductCard";
import { produits } from "../Produits/produits";
import { useEffect, useState } from 'react';

export default function Filter() {
  const [product, setProduct] = useState('');

  const inputValue = (e) => setProduct(e.target.value);

  const filterType = produits.filter((elm) => elm.type.toLowerCase().includes(product.toLocaleLowerCase()));

  return (
    <>
      <input value={product} onChange={inputValue} placeholder="Artiste, Bijoux, Meuble" type="text" /><br />
      <button style={{ cursor: "pointer" }}>Vendez</button>
      
    </>
  )
}
