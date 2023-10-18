import { useState, useEffect } from 'react';
import axios from 'axios';

import "./getProducts.css"

export default function GetProduct() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');
  const [productName, setProductName] = useState('');//State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit


  const handleTitle = (e) => setTitle(e.target.value); //ca c'est l'event handler qui fait que la state productName a pour valeur la value de l'input

  return (
    <div>

    </div>
  )
}
