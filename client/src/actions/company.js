import axios from 'axios'
import { ALL_COMPANIES, GET_COMPANIES_FAIL } from './types'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const getCompanies = () => async dispatch => {
  try {
    const res = await axios.get('/api/company')
    dispatch({
      type: ALL_COMPANIES,
      payload: res.data,
    })
  } catch (err) {
    // handle error sent by API
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({ type: GET_COMPANIES_FAIL })
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
