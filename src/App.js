//Imports fait
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nomIcone } from '@fortawesome/free-solid-svg-icons'

import './App.css';
import Header from './Header/Header';
import ProductCard from './ProductCard/ProductCard';

function App() {
  return (
    <>
    <Header />
    <ProductCard />
    </>
  )
}

export default App;
