import React from 'react';
import editButton from '../images/edit.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({handleCardClick, onEditAvatar, onEditProfile, onAddPlace, setCardId, onCardLike, onCardDelete, cards}) {

  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__pic" src={userInfo.avatar} alt="profile" onClick={onEditAvatar}/>
        <img className="profile__pic-edit" src={editButton} alt="edit button" />
        <div className="profile__info">
          <h1 className="profile__title">{userInfo.name}</h1>
          <button className="profile__edit" type="button" aria-label="edit" onClick={onEditProfile} />
          <p className="profile__subtitle">{userInfo.about}</p>
          
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