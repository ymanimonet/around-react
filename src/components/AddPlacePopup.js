import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleAddCardSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
        console.log(name);
        console.log(link);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    return(
      <PopupWithForm
        name="add"
        title="New Place"
        submitButton="Create"
        isOpen={isOpen}
        onSubmit={handleAddCardSubmit}
        onClose={onClose}
      >
        <fieldset className="form__text">
          <input
            onChange={handleNameChange}
            id="card-title"
            className="form__item form__item_field_title"
            type="text"
            name="name"
            placeholder="Title"
            minLength={1}
            maxLength={30}
            required
          />
          <span
            id="card-title-error"
            className="form__error"
          />
          <input
            onChange={handleLinkChange}
            id="card-url"
            className="form__item form__item_field_image-url"
            type="url"
            name="link"
            placeholder="Image Link"
            required 
          />
          <span
            id="card-url-error"
            className="form__error"
          />
        </fieldset>
      </PopupWithForm>
    );
}

export default AddPlacePopup;