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
            localStorage.setItem('user', JSON.stringify(json.user))
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
          localStorage.removeItem("user")
        })
        .catch(err => {throw new Error(err)})
    },

    checkError: (error) => {
      const status = error.status
      if (status === 401 || status === 403) {
        localStorage.removeItem("user");
        return Promise.reject({ message: error.message })
      }
      return Promise.resolve()
    },

    checkAuth: () => {
      return localStorage.getItem("user")
        ? Promise.resolve()
        : Promise.reject({ message: 'Login required'})
    },

    getPermissions: () => {
      try {
        const { isAdmin } = JSON.parse(localStorage.getItem("user"))
        return Promise.resolve({ isAdmin: isAdmin })
      }
      catch (err) {
        return Promise.reject(err)
      }
    },

    getIdentity: () => {
      try {
        const { id, username } = JSON.parse(localStorage.getItem("user"))
        return Promise.resolve({ id: id, fullName: username })
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }