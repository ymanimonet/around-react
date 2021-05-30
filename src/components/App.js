import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api';



function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardId, setCardId] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data) //description
      .then(data => {
        setUserInfo(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  function handleUpdateAvatar (avatar) {
    api.updateAvatar(avatar)
      .then(avatar => {
        setUserInfo(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace ({name, link}) {
    api.addCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    api.gatherUserInfo()
      .then(res => {
        setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, []);

  React.useEffect(() => {

    api.getInitialCards().then((items) => {
      setCards(items);
    })
    .catch((err) => console.log(err));

  }, []);

  function onCardLike(card) {
    
    const isLiked = card.likes.some(i => i._id === userInfo._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
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
  <CurrentUserContext.Provider value={userInfo}>
  <div className="root">
  <div className="root__container">
    <Header />
    <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      handleCardClick={handleCardClick}
      setCardId={setCardId}
      cardId={cardId}
      cards={cards}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
    
    <EditProfilePopup 
      isOpen={isEditProfileOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlace}
    />

    <PopupWithForm
      name="delete"
      title="Are you sure?"
      submitButton="Yes"
    >
    </PopupWithForm>
    <ImagePopup
      card={selectedCard}
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}
    />
    <Footer />
  </div>
  
</div>
</CurrentUserContext.Provider>

  );
}

export default App;
