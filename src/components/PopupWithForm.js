function PopupWithForm(props)  {
    return(
      <div className={`popup popup_type_${props.name} ${props.isOpen ? ("popup_opened") : ""}`}>
          <div className={`popup__container popup__container_type_${props.name}`}>
            <button className="popup__close" type="button" aria-label="close" onClick={props.onClose} />
            <form className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
              <h2 className="form__title">{props.title}</h2>
              {props.children}
              <button className="form__button" type="submit" aria-label={props.name}>{props.submitButton}</button>
            </form>
          </div>
      </div>
    )
}

export default PopupWithForm;