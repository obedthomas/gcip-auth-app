import axios from 'axios'
import { ALL_COMPANIES, GET_COMPANIES_FAIL } from './types'
import { setAlert } from './alert'

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
