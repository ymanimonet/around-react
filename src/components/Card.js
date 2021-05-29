import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, handleCardClick, onCardLike, onCardDelete, setCardId}) {

  const userInfo = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userInfo._id;
  const isLiked = card.likes.some(i => i._id === userInfo._id);

  const cardDeleteButton = (
    `element__delete ${isOwn ? '' : 'element__hidden'}`
  );

  const cardLikeButton = (
    `element__heart ${isLiked ? 'element__heart_active' : ''}`
  ); 

  function handleClick() {
    handleCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    setCardId(card._id);
    onCardDelete(card);
  }

  return(
    <li className="element"> 
      <button className={cardDeleteButton} type="button" aria-label="delete" onClick={handleDeleteClick}></button>
      <img className="element__photo" src={card.link} alt="unloadable" onClick={handleClick} /> 
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
          <div className="element__likes">
            <button className={cardLikeButton} type="button" aria-label="heart" onClick={handleLikeClick}></button>
            <p className="element__number">{card.likes.length}</p>
          </div>
      </div>
    </li>
  )
}

export default Card;