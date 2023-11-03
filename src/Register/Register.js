import { useState } from 'react'
import './register.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoginModel from '../PropsComponents/LoginModel';


export default function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate(); //Function qui permet de mener vers un lien sous condition / Si condition vraie, navigate(/...)
  //whenever we signup successfully we should move to the login page

  //Pour donner des values aux states
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  //Pour Post la data une fois qu'on clique sur Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3005/register', { name, email, password }) //Une fois qu'on post la data, si succès crée alert, sinon catch err console.log l'err
      .then(res => {
        navigate('/newlogin') //Si on signup bien, ca nous mènera vers login page
      })
      .catch(err => console.log(err))

  }


  return (
    <>

      <LoginModel heading="Register" handleSubmit={handleSubmit} handleEmail={handleEmail} handlePassword={handlePassword} btn1="Register" account="You have an account?" btn2="Sign in" link="/newlogin" />

    </>
  )
}
