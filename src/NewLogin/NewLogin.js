//Same code than Register.js sans le name, car déjà inscrit

import { useState } from 'react'
import './newLogin.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Register() {

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
        console.log(res.data);//When login is success

        // navigate('/login')

      })
      .catch(err => console.log(err))

  }




  return (
    <>

      <h1>Login</h1>

      <form className='new-login-form' onSubmit={handleSubmit} >

        <div className='new-email'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            className='new-log-input'
            placeholder='Enter Email'
            onChange={handleEmail}
            required
          />
        </div>


        <div className='new-password'>
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            className='new-log-password'
            placeholder='Enter Password'
            onChange={handlePassword}
            required
          />
        </div>

        <div className='new-divlog-button'>
          <button className='new-log-button' type='submit'> Login </button>
          <h4>Already have an Account ?</h4>

          {/* Quand on sign up successfully ça doit mener vers la login page */}
          <Link to='/newlogin'>
            <button className='new-signup' type='submit'> Register </button>
          </Link>
        </div>

      </form>


    </>
  )
}
