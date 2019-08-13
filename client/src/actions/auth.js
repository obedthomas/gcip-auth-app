import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REQUEST_USER,
} from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'
import setAuthToken from './../utils/setAuthToken'
import { getUsers } from './users'

// Login user
export const login = (email, password, history) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify({ email, password })

  dispatch({ type: REQUEST_USER })
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
    console.log('Other err ' + err)
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
    dispatch(setLoader(true))
    await axios.post('/api/user/register', body, config)
    dispatch(setAlert('User has been created', 'success'))
    dispatch(setLoader(false))
    push('/admin/users')
  } catch (err) {
    // handle error sent by API
    console.log(err)
    const errors = err.response.data.errors
    dispatch(setLoader(false))
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Activate User
export const activate = (data, push) => async dispatch => {
  const { token, newPassword, tempPassword } = data
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify({
    currentPassword: tempPassword,
    newPassword,
  })

  try {
    await axios.put(`/api/user/activate/${token}`, body, config)
    dispatch(setAlert('Account has been activated', 'success'))
    push('/public/login')
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    console.log(errors)
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Edit user
export const editUser = (data, id, isMine, history) => async dispatch => {
  // isMine is a bool value to determine if we are editing the logged in user's details
  // or the details of another user
  const { firstName, lastName, email, company, department, role } = data
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    company,
    department,
    role,
  })

  try {
    dispatch(setLoader(true))
    await axios.put(`/api/user/${id}`, body, config)
    isMine && dispatch(loadUser())
    dispatch(setLoader(false))
    dispatch(setAlert('User has been updated', 'success'))
    if (!isMine) {
      dispatch(getUsers())
      history.push('/admin/users')
    }
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    console.log(errors)
    dispatch(setLoader(false))
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
