import { useState } from 'react'
import './newSignup.css'
import axios from 'axios';


export default function NewSignup() {

const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();

//Pour donner des values aux states
const handleName = (e) => setName(e.target.value);
const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);

//Pour Post la data une fois qu'on clique sur Submit
const handleSubmit = (e) => {
  e.preventDefault()

  axios.post( 'http://localhost:3005/register', {name, email, password} ) //Une fois qu'on post la data, si succès crée alert, sinon catch err console.log l'err
  .then (res => {
    alert('Login Submitted')
  })
  .catch(err => console.log(err))
  
}




  return (
    <>

      <h1>Login</h1>

      <form className='new-login-form' onSubmit={handleSubmit} >

      <div className='new-email'>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name" 
            type="text" 
            className='new-log-input' 
            placeholder='Enter Name'
            onChange={handleName}
            required
            />
        </div>

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
          <button className='new-signup' type='submit'> Sign up </button>
        </div>

      </form>


    </>
  )
}
