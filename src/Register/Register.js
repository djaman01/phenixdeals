import { useState } from 'react'
import './register.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

      <h1>Register</h1>

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
          <button className='new-log-button' type='submit'> Register </button>

          <h4>Already have an Account ?</h4>

          {/* Va sur page pour login */}
          <Link to='/newlogin'>
            <button className='new-signup' type='submit'> Login </button>
          </Link>
        </div>

      </form>


    </>
  )
}
