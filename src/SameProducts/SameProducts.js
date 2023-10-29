import { useState, useEffect } from 'react';
import axios from 'axios';

import './SameProducts.css'

export default function SameProducts() {

  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les produits
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = () => {

      axios.get('http://localhost:3005/same-product')
        .then((response) => {
          console.log("Same products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };
    fetchData();
  }, [productObject]);//fetch la data quand productObjected change value


  return (

    <div>

    </div>
  )
}
