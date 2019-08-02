import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from './types'
import { setAlert } from './alert'
import setAuthToken from './../utils/setAuthToken'

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify({ email, password })

  // make post req
  try {
    const res = await axios.post('/api/auth', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (err) {
    dispatch({ type: AUTH_ERROR })
  }
}

// Create User
export const register = (data, push) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify(data)
  try {
    await axios.post('/api/user/register', body, config)
    dispatch(setAlert('User has been created', 'success'))
    push('/admin/users')
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    console.log(errors)
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
