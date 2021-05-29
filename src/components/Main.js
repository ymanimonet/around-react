import React from 'react';
import editButton from '../images/edit.svg';
import {api} from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({handleCardClick, onEditAvatar, onEditProfile, onAddPlace, setCardId, cardId}) {

  const [cards, setCards] = React.useState([]);

  const userInfo = React.useContext(CurrentUserContext);

  React.useEffect(() => {

    api.getInitialCards().then((items) => {
      setCards(items);
    })
    .catch((err) => console.log(err));

  }, []);

  function onCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === userInfo._id);
    
    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  } 

  function onCardDelete() {
    api.removeCard(cardId).then(() => {
      const newCards = cards.filter((card) => card._id !== cardId);
      setCards(newCards);
    })
    .catch((err) => console.log(err));
  }

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__pic" src={userInfo.avatar} alt="profile" onClick={onEditAvatar}/>
        <img className="profile__pic-edit" src={editButton} alt="edit button" />
        <div className="profile__info">
          <h1 className="profile__title">{userInfo.name}</h1>
          <button className="profile__edit" type="button" aria-label="edit" onClick={onEditProfile} />
          <p className="profile__subtitle">{userInfo.description}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(card => {
            return(
              <Card
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes}
                key={card._id}
                handleCardClick={handleCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                setCardId={setCardId}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;