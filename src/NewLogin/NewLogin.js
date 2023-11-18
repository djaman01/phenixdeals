import { useState } from 'react'

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoginModel from '../PropsComponents/LoginModel';


export default function Register() {

  const navigate = useNavigate(); //Function qui permet de mener vers un lien sous condition / Si condition vraie, navigate(/...)

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Pour donner des values aux states
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  axios.defaults.withCredentials = true; //Pour activer le code qui store le token dans le cookie

  //Pour Post la data une fois qu'on clique sur Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3005/login', { email, password })
      .then(res => {
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate('/dashboard')

          }
          else {
            navigate('/')
          }
        }
        console.log(res.data);//When login is success
      })
      .catch(err => console.log(err))

  }

  return (
    <>

    <LoginModel heading="Login" handleSubmit={handleSubmit} handleEmail={handleEmail} handlePassword={handlePassword} btn1="Submit" account="Don't have any account?" btn2="Register" link="/register"/>

    </>
  )
}
