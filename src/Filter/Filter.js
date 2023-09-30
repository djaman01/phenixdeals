
import { produits } from "../20Produits/20produits";
import { useState } from 'react';

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
