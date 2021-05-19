function Card({card, handleCardClick}) {

    function handleClick() {
        handleCardClick(card);
      }  

    return(
      <li className="element"> 
        <button className="element__delete" type="button" aria-label="delete"></button>
        <img className="element__photo" src={card.link} alt="unloadable" onClick={handleClick} /> 
        <div className="element__container">
          <h2 className="element__title">{card.name}</h2>
            <div className="element__likes">
              <button className="element__heart" type="button" aria-label="heart"></button>
              <p className="element__number">{card.likes.length}</p>
            </div>
       </div>
      </li>
    )
}

export default Card;