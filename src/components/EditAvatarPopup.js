import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    } 

    return(
      <PopupWithForm
        name="avatar"
        title="Change profile picture"
        submitButton="Save"
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={onClose}
      >
        <fieldset className="form__text">
          <input
            ref={avatarRef}
            id="avatar-url"
            className="form__item form__item_field_avatar-url"
            type="url"
            name="link"
            placeholder="Image Link"
            required
          />
          <span
            id="avatar-url-error"
            className="form__error"
          />
        </fieldset>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;