import axios from 'axios'
import { FETCH_USERS, RECEIVE_USERS, FAILED_FETCH_USERS } from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const getUsers = () => async dispatch => {
  dispatch({ type: FETCH_USERS })
  try {
    const res = await axios.get('/api/user')
    dispatch({
      type: RECEIVE_USERS,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    console.log(err)
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({ type: FAILED_FETCH_USERS, payload: errors })
    }
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    dispatch(setLoader(true))
    const res = await axios.delete(`/api/user/${userId}`)
    dispatch(getUsers())
    dispatch(setLoader(false))
    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    // handle error sent by API
    dispatch(setLoader(false))
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
