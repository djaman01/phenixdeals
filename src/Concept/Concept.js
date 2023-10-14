import './concept.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'


import { SocialIcon } from 'react-social-icons'


export default function Concept() {

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <>
      <Header />

      <div className="concept">
        <h1>Notre concept</h1>
      </div>

      <div className='all-concept'>


        <div class="card-activité">

          <p class="card-title">Activité</p>
          <p class="small-desc">
            <b>phenixdeals</b> est une plateforme d'intérmédiation, spécialisé dans la vente d'objets d'arts, de décoration et de Bijoux.
          </p>
          <p class="small-desc">
            <b>Parcourez notre site:</b> Des articles variés sont disponibles, tous en rapport avec l'art et la décoration.
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>

          <Link to="/">
            <button class="btn-achat">Voir les nouveaux produits</button>
          </Link>

        </div>

        <div class="card-vente">

          <div class="content-vente">
            <p class="heading-vente"> Vendez sur notre site !</p>

            <p class="para-vente" style={{ marginTop: "-25px" }}> 2 choix s'offre à vous:</p>

            <p style={{ marginTop: "-25px" }}>
              <b>1-</b> Postez vos bien sur le site <b>sans frais</b>: <br />
              <u>Une fois vendu</u>, nous prenons <b>15%</b> de commission sur le prix de vente
            </p>

            <p style={{ marginTop: "-25px" }}>
              <b>2-</b> Payez <b>7% du prix de vente</b> <u>avant de poster</u> votre produit: <br />
              Dans ce cas, nous mettrons vos informations sur le produit (numéro, nom..etc) et vous serez en contact direct avec l'acheteur
            </p>

            <Link to="/contact" onClick={scrollToTop}>
              <button class="btn-vente">Contactez-nous</button>
            </Link>
          </div>

        </div>

        <div className='card-media'>
          <h2>Suivez-nous sur nos réseaux sociaux</h2>
          <p className='para-media'>Nous y sommes aussi très actifs !</p>
          <h4>N'hésitez pas à vous abonner à nos pages:</h4>
          <div style={{marginLeft:"80px"}}>
            <span ><SocialIcon url="https://www.instagram.com/phenixdeals/" target="_blank" />  </span>
            <span style={{ marginLeft: 20 }}><SocialIcon url="https://web.facebook.com/profile.php?id=100090243464213" target="_blank" />  </span>
          </div>
        </div>






      </div>







      <Footer />

    </ >

  )
}
