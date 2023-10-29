import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //Navigate is used to redirect to a component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIconName } from '@fortawesome/free-solid-svg-icons' // Replace with your actual icon import
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
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false); //State to confirm if i'm authenticated or not

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='ficheproduit/:id' element={<FicheProduit />} />
        <Route path="contact" element={<Contact />} />
        <Route path="concept" element={<Concept />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="getproduct" element={<GetProduct />} />
        <Route path="tableaux" element={<Tableaux />} />
        <Route path="bijoux" element={<Bijoux />} />
        <Route path="decoration" element={<Decoration />} />
        <Route path="livres" element={<Livres />} />

        {/* Pour accéder au DashBoard */}
        <Route path="login" element={<Login onLogin={() => setAuthenticated(true)} />} />  {/*When the user logs in: authenticated=True  */}
        <Route
          path="dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />} //if authenticated=true=>Dashboard appear if false=>REDIRECT to login page
        />

        <Route path="fichedatabase/:productId" element={<FicheDatabase />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
