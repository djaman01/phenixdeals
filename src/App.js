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
import ImageUpload from './ImageUpload';
import AddProduct from './AddProduct/AddProduct';
import GetProduct from './GetProduct/GetProduct';


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
          <Route path="getproduct" element={<GetProduct />} />
          <Route path= 'imageUpload' element= {<ImageUpload/>} />
          <Route path= 'addProduct' element= {<AddProduct/>} />
          <Route path="*" element={<NoPage />} />
      
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App;
