import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getGlobalData(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return localStorage.getItem(key)
  }
}

export function setGlobalData(key, value) {
  try {
    return localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    return localStorage.setItem(key, value)
  }
}
