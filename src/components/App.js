import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';

function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpn, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
  <div className="root">
  <div className="root__container">
    <Header />
    <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      handleCardClick={handleCardClick}
    />
    <PopupWithForm
      name="edit"
      title="Edit Profile"
      submitButton="Save"
      isOpen={isEditProfileOpen}
      onClose={closeAllPopups}
    >
      <fieldset className="form__text">
        <input id="profile-name" className="form__item form__item_field_name" type="text" name="name" placeholder="Name" minLength={2} maxLength={40} required />
        <span id="profile-name-error" className="form__error" />
        <input id="profile-text" className="form__item form__item_field_description" type="text" name="about" placeholder="About me" minLength={2} maxLength={40} required />
        <span id="profile-text-error" className="form__error" />
      </fieldset>
    </PopupWithForm>

    <PopupWithForm
      name="add"
      title="New Place"
      submitButton="Create"
      isOpen={isAddPlacePopupOpn}
      onClose={closeAllPopups}
    >
      <fieldset className="form__text">
        <input id="card-title" className="form__item form__item_field_title" type="text" name="name" placeholder="Title" minLength={1} maxLength={30} required />
        <span id="card-title-error" className="form__error" />
        <input id="card-url" className="form__item form__item_field_image-url" type="url" name="link" placeholder="Image Link" required />
        <span id="card-url-error" className="form__error" />
      </fieldset>
    </PopupWithForm>

    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      submitButton="Save"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
    >
      <fieldset className="form__text">
        <input id="avatar-url" className="form__item form__item_field_avatar-url" type="url" name="link" placeholder="Image Link" required />
        <span id="avatar-url-error" className="form__error" />
      </fieldset>
    </PopupWithForm>

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

  );
}

export default App;
