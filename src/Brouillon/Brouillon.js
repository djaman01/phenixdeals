import './brouillon.css'

export default function Brouillon() {
  return (
    <>
      <div className="all-box">

        <form className="form-add-product">

          <span className="title-add-product">Add Product</span>
          <span className="subtitle-add-product">Send product to Database</span>
          
          <div className="div-input-add">
            
            <input type="text" className="input-product" placeholder="Full Name" />
            <input type="email" className="input-product" placeholder="Email" />
            <input type="password" className="input-product" placeholder="Password" />

          </div>

          <button>Submit Product</button>

        </form>

      </div>
    </>
  )
}
