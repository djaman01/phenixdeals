
import './homeTitle.css'
import { produits } from "../20Produits/20produits";
import { useState } from 'react';
import ProductCard from "../ProductCard/ProductCard";


export default function HomeTitle() {

  const [product, setProduct] = useState('');

  const inputValue = (e) => setProduct(e.target.value);

  const filterType = produits.filter((elm) => elm.type.toLowerCase().includes(product.toLowerCase()));

  return (
    <div class="main-page">
      <div class="div-title-home">

        <h1 className='home-title'>
          Les 20 Nouveaux produits
        </h1>
        
        <div className='input-home'>

          <div class="searchbar">
            <div class="searchbar-wrapper">
              <div class="searchbar-left">
                <div class="search-icon-wrapper">
                  <span class="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                      </path>
                    </svg>
                  </span>
                </div>
              </div>

              <div class="searchbar-center">
                <div class="searchbar-input-spacer"></div>
                <input value={product} class="searchbar-input" title="Search" role="combobox" maxlength="2048" name="q" autocapitalize="off" autocomplete="off" onChange={inputValue} placeholder="tableau, déco, bijou, livre" type="text" />
              </div>


            </div>
          </div>
        </div>

      </div>

      <div className="grid-home-filter">

        {filterType.map((e, i) => <ProductCard {...e} key={i} />)}

      </div>

    </div>
  )
}
