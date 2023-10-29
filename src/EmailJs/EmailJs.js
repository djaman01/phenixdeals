import React, { useRef } from 'react';
import emailjs from 'emailjs-com'; //Il faut installer npm install emailjs-com

import './reserve.css'


export default function EmailJs() {

  const alertSub = () => alert ("done")
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_pjw8ixl', 'template_dn3bc9d', form.current, 'S53y2jSygc-7YTjTo') //Public key dans Account
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <form ref={form} className="email-container" onSubmit={sendEmail}>
      <input type="email" name="user_email" placeholder="Enter your email address" />
      <button className="btn btn-j" onClick={alertSub}>Join Now</button>
    </form>
  )



}
