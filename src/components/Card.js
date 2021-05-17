function Card(props) {

    function handleClick() {
        props.handleCardClick(props.card);
      }  

    return(
      <li className="element"> 
        <button className="element__delete" type="button" aria-label="delete"></button>
        <img className="element__photo" src={props.link} alt="unloadable" onClick={handleClick} /> 
        <div className="element__container">
          <h2 className="element__title">{props.name}</h2>
            <div className="element__likes">
              <button className="element__heart" type="button" aria-label="heart"></button>
              <p className="element__number">{props.likes.length}</p>
            </div>
       </div>
      </li>
    )
}

export default Card;