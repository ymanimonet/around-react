function ImagePopup({card, onClose, isOpen}) {
    return(
        <div className={`popup popup_type_image ${isOpen ? ("popup_opened") : ""}`}>
          <div className="popup__container popup__container_type_image">
            <button className="popup__close" type="button" aria-label="close" onClick={onClose} />
            <figure className="popup__figure">
              <img className="popup__image" src={card.link} alt="unloadable" />
              <figcaption className="popup__image-title">{card.name}</figcaption>
            </figure>
          </div>
      </div>
    )
}

export default ImagePopup;