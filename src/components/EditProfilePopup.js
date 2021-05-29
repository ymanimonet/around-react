import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Subscription to the context
  const userInfo = React.useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo]); 

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateUser({
            name,
            description,
        });
    };

    function handleNameChange (e) {
        setName(e.target.name)
    }

    function handleDescriptionChange (e) {
        setDescription(e.target.description)
    }
    
    return (
      <PopupWithForm
        name="edit"
        title="Edit Profile"
        submitButton="Save"
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={onClose}
      >
        <fieldset className="form__text">
          <input
            id="profile-name"
            className="form__item form__item_field_name"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            minLength={2}
            maxLength={40}
            required
          />
          <span
            id="profile-name-error"
            className="form__error"
          />
          <input
            id="profile-text"
            className="form__item form__item_field_description"
            type="text"
            name="about"
            placeholder="About me"
            value={description}
            onChange={handleDescriptionChange}
            minLength={2}
            maxLength={40}
            required
          />
          <span
            id="profile-text-error"
            className="form__error"
          />
        </fieldset>
      </PopupWithForm>
    );
}

export default EditProfilePopup;