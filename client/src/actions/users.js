import axios from 'axios'
import { LOAD_USERS } from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/user')
    dispatch({
      type: LOAD_USERS,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    console.log(err)
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
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
