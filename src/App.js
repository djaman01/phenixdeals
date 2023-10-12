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
import Tableaux from './Tableaux/Tableaux';



function App() {
  return (
    <>

    <BrowserRouter>
        <Routes>
          {/* path="/" est obligé car c'est la page par défaut qui va s'ouvrir */}
          <Route path="/" element={<Main />} />
          <Route path='ficheproduit/:id' element={<FicheProduit />}/>
          <Route path="contact" element={<Contact />} />
          <Route path="tableaux" element={<Tableaux />} />          
          <Route path="*" element={<NoPage />} />
      
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
