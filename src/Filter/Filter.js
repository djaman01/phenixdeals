import "./filter.css"

export default function Filter() {

  return (
    <>
      <div className="input-header">
        <input placeholder="Artiste, Bijoux, Meuble" type="text" /><br />
      </div>

      <div className="button-header">
        <button style={{ cursor: "pointer" }}>Vendre</button>
      </div>

    </>
  )
}
