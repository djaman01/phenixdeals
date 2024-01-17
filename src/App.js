
import { BrowserRouter, Routes, Route} from "react-router-dom"; //Navigate is used to redirect to a component

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
import Register from './Register/Register';
import NewLogin from './NewLogin/NewLogin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='ficheproduit/:id' element={<FicheProduit />} />
        <Route path="contact" element={<Contact />} />
        <Route path="concept" element={<Concept />} />
        <Route path="getproduct" element={<GetProduct />} />
        <Route path="tableaux" element={<Tableaux />} />
        <Route path="bijoux" element={<Bijoux />} />
        <Route path="decoration" element={<Decoration />} />
        <Route path="livres" element={<Livres />} />
        <Route path="register" element={<Register />} />
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="fichedatabase/:productId" element={<FicheDatabase />} />

        {/* 2 Protected routes par tokens: on y accède que par l'url */}
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
