import React from 'react';
import editButton from '../images/edit.svg';
import {api} from '../utils/Api.js';
import Card from './Card.js'

function Main({handleCardClick, onEditAvatar, onEditProfile, onAddPlace, card}) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    function gatherUserInfo() {
      return fetch(this._baseUrl + "/users/me", {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    }

    function getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
          headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    }

    api.gatherUserInfo().then((result) => {
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);
    })

    api.getInitialCards().then((items) => {
      setCards(items);
    })

  });

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__pic" src={userAvatar} alt="profile" onClick={onEditAvatar}/>
        <img className="profile__pic-edit" src={editButton} alt="edit button" />
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__edit" type="button" aria-label="edit" onClick={onEditProfile} />
          <p className="profile__subtitle">{userDescription}</p>
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
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;