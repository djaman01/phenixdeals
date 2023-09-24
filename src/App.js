//Imports fait
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nomIcone } from '@fortawesome/free-solid-svg-icons'

import './App.css';

import Main from './Main/Main';
import FicheTableau from './FicheTableau/FicheTableau'
import NoPage from './NoPage/NoPage';


function App() {
  return (
    <>

    <BrowserRouter>
        <Routes>
          {/* path="/" est obligé car c'est la page par défaut qui va s'ouvrir */}
          <Route path="/" element={<Main />} />
          <Route path="Movies" element={<Main />} />
          <Route path='fichetableau/:param' element={<FicheTableau />}/>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
