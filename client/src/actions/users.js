import axios from 'axios'
import { LOAD_USERS } from './types'
import { setAlert } from './alert'

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/user')
    dispatch({
      type: LOAD_USERS,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
