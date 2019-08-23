import axios from 'axios'
import {
  FETCH_APPS,
  FAILED_FETCH_APPS,
  RECEIVE_APPS,
  FETCH_SINGLE_APP,
  RECEIVE_SINGLE_APP,
  FAILED_FETCH_SINGLE_APP,
} from './types'
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
      dispatch({ type: FAILED_FETCH_APPS, payload: errors })
    }
  }
}

export const addApp = data => async dispatch => {
  dispatch(setLoader(true))
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify(data)
  try {
    const res = await axios.post('/api/application', body, config)
    dispatch(setAlert(res.data.msg, 'success'))
    dispatch(getApps())
    dispatch(setLoader(false))
    return true
  } catch (err) {
    dispatch(setLoader(false))
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    return null
  }
}

export const getApp = id => async dispatch => {
  dispatch({ type: FETCH_SINGLE_APP })
  dispatch(setLoader(true))
  try {
    const res = await axios.get(`/api/application/${id}`)
    dispatch({ type: RECEIVE_SINGLE_APP, payload: res.data })
    dispatch(setLoader(false))
  } catch (err) {
    dispatch(setLoader(false))
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({ type: FAILED_FETCH_SINGLE_APP, payload: errors })
    }
  }
}
