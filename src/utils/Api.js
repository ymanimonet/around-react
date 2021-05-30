class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    gatherUserInfo() {
        return fetch(this._baseUrl + "/users/me", {
            headers: this._headers
          })
          .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    }

    updateUserInfo({name, about}) { 
        return fetch(this._baseUrl + "/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
          })
          .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    }

    updateAvatar({avatar}) {
        return fetch(this._baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
          })
          .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
          headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    }

    addCard({name, link}) {
        debugger;
        return fetch(this._baseUrl + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }

    removeCard(cardId) {
        return fetch(this._baseUrl + "/cards/" + cardId, {
                method: "DELETE",
                headers: this._headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
                method: isLiked ? "PUT" : "DELETE",
                headers: this._headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)));
    }
    
  
}


export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-7",
    headers: {
      authorization: "20ab70d8-b14f-4271-bdde-c31cc9b6d660",
      "Content-Type": "application/json"
    }
});
  
