import api from './api'
const { root, auth, login, logout } = api

export const authProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${root}/${auth}/${login}`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: new Headers({ 'Content-Type': 'application/json'})
        })
        return fetch(request)
          .then(response => response.json())
          .then(json => {
            if (!json.user) throw new Error(json.message)
            localStorage.setItem('userUuid', json.user.uuid)
          })
          .catch(err => {throw new Error(err)})
    },

    logout: () => {
      const request = new Request(`${root}/${auth}/${logout}`, {
        method: 'DELETE'
      })
      return fetch(request)
        .then(response => {
          if (response.status !== 204) throw new Error(response.statusText)
          localStorage.removeItem("userUuid")
        })
        .catch(err => {throw new Error(err)})
    },

    checkError: (error) => {
      const status = error.status
      if (status === 401 || status === 403) {
        localStorage.removeItem("userUuid");
        return Promise.reject({ message: error.message })
      }
      return Promise.resolve()
    },

    checkAuth: () => {
      return localStorage.getItem("userUuid")
        ? Promise.resolve()
        : Promise.reject({ message: 'Login required'})
    },

    getPermissions: () => Promise.resolve(), //TODO
  }