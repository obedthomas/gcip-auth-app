import axios from 'axios'
import {
  FETCH_COMPANIES,
  RECEIVE_COMPANIES,
  FETCH_COMPANIES_FAIL,
} from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const getCompanies = () => async dispatch => {
  dispatch({ type: FETCH_COMPANIES })
  try {
    const res = await axios.get('/api/company')
    dispatch({
      type: RECEIVE_COMPANIES,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({ type: FETCH_COMPANIES_FAIL, payload: errors })
    }
  }
}

export const addCompany = (data, push) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify(data)
  try {
    dispatch(setLoader(true))
    const res = await axios.post('/api/company', body, config)
    dispatch(setAlert(res.data.msg, 'success'))
    dispatch(getCompanies())
    dispatch(setLoader(false))
    push('/admin/companies')
  } catch (err) {
    dispatch(setLoader(false))
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const deleteCompany = id => async dispatch => {
  try {
    dispatch(setLoader(true))
    const res = await axios.delete(`/api/company/${id}`)
    dispatch(setAlert(res.data.msg, 'success'))
    dispatch(getCompanies())
    dispatch(setLoader(false))
    // push('/admin/companies')
  } catch (err) {
    dispatch(setLoader(false))
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

export const editCompany = data => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body = JSON.stringify({ name: data.name })

  try {
    dispatch(setLoader(true))
    const res = await axios.put(`/api/company/${data._id}`, body, config)
    dispatch(setAlert(res.data.msg, 'success'))
    dispatch(getCompanies())
    dispatch(setLoader(false))
  } catch (err) {
    dispatch(setLoader(false))
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
