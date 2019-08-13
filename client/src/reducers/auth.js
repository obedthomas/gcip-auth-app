import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REQUEST_USER,
} from '../actions/types'

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
}

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case REQUEST_USER:
      return { ...state, loading: true }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }

    case USER_LOADED:
      return { ...state, user: payload, isAuthenticated: true, loading: false }

    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token')
      return { ...state, token: null, isAuthenticated: false, loading: false }

    default:
      return state
  }
}
