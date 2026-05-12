import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

/**
 * Calls POST /token and returns { access_token, refresh_token, token_type, expires_in }
 */
export async function loginRequest(username, password) {
  const response = await axios.post(`${BASE_URL}/token`, { username, password })
  return response.data
}

/**
 * Calls POST /token/refresh and returns new tokens
 */
export async function refreshRequest(refreshToken) {
  const response = await axios.post(`${BASE_URL}/token/refresh`, {
    refresh_token: refreshToken,
  })
  return response.data
}
