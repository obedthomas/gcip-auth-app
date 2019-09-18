import axios from 'axios'
import {
  FETCH_OPTIONS_USERS,
  RECEIVE_OPTIONS_USERS,
  FAILED_FETCH_OPTIONS_USERS,
} from './types'
import { setAlert } from './alert'

export const getOptionsUsers = () => async dispatch => {
  dispatch({ type: FETCH_OPTIONS_USERS })
  try {
    const res = await axios.get('/api/user/options')
    dispatch({
      type: RECEIVE_OPTIONS_USERS,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    console.log(err)
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({ type: FAILED_FETCH_OPTIONS_USERS })
    }
  }
}
