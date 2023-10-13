import './concept.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


export default function Concept() {
  return (
    <>
      <Header />
      <div className="concept">
        <h1>Notre concept</h1>
      </div>

      <div className="vente-concept">
        <img src="/HandShake.jpg" alt="Vendez vos objets d'art et déco" className="img-vente-concept" />
        <h1 className='titre-vente-concept'>Vendez et Achetez des objets d'art et déco</h1>

        <p className='text-vente-concept'>
          Phenixdeals est un site de vente et d'intermédiation d'objets d'arts, de Bijoux et de décorations.<br/>

          Vous pouvez mettre en vente vos objets sur notre site:<br/>
          Pour cela, il suffit juste de nous contacter, par mail ou par téléphone. <br/>

          Nous serons heureux de vous répondre et de discuter avec vous.<br/>

          Nous proposons 2 solution:<br/>
          1: Mettre en vente sans frais sur notre site. Dans ce cas, nous prenons 15% de commission sur le prix de vente une fois le produit vendu.<br/>
          Ou<br/>
          2: Economisez 50% en nous payons directement 7% du prix de vente, pour mettre en vente votre profuit, en laissant apparaitre votre contact (numéro de téléphone, nom)<br/>
        </p>

      </div>

      <Footer />

    </>

  )
}
