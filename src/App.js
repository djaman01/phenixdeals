//Imports fait
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nomIcone } from '@fortawesome/free-solid-svg-icons'
import './App.css';

import Main from './Main/Main';
import NoPage from './NoPage/NoPage';
import FicheProduit from './FicheProduit/FicheProduit';
import Contact from './Contact/Contact';
import Concept from './Concept/Concept';
import AddProduct from './AddProduct/AddProduct';
import GetProduct from './GetProduct/GetProduct';
import Bijoux from './Bijoux/Bijoux';
import Tableaux from './Tableaux/Tableaux';
import Decoration from './Decoration/Decoration';
import Livres from './Livres/Livres';
import FicheDatabase from './FicheDatabase/FicheDatabase';



function App() {
  return (
    <>

    <BrowserRouter>
        <Routes>
          {/* path="/" est obligé car c'est la page par défaut qui va s'ouvrir */}
          <Route path="/" element={<Main />} />
          <Route path='ficheproduit/:id' element={<FicheProduit />}/>
          <Route path="contact" element={<Contact />} />
          <Route path="concept" element={<Concept />} />  
          <Route path="addProduct" element={<AddProduct />} />  
          <Route path="getproduct" element={<GetProduct />} />
          <Route path="tableaux" element={<Tableaux />} />
          <Route path="bijoux" element={<Bijoux />} />
          <Route path="decoration" element={<Decoration />} />
          <Route path="livres" element={<Livres />} />
          <Route path="fichedatabase/:_id" element={<FicheDatabase />} />
          <Route path="*" element={<NoPage />} />
      
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App;
