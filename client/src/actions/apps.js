import axios from 'axios'
import { FETCH_APPS, FAILED_FETCH_APPS, RECEIVE_APPS } from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const getApps = () => async dispatch => {
  dispatch({ type: FETCH_APPS })
  try {
    const res = await axios.get('/api/application')
    dispatch({ type: RECEIVE_APPS, payload: res.data })
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: FAILED_FETCH_APPS, payload: errors })
  }
}
