import Filter from '../Filter/Filter'
import './homeTitle.css'


export default function HomeTitle() {
  return (
    <>
      <div class="div-title-home">
        <h1>
          Nouveaux Produits
        </h1>
        <div>
          <Filter />
        </div>
      </div>

    </>
  )
}
