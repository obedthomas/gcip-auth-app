import { FETCH_STATS } from './types'
import axios from 'axios'
import { setAlert } from './alert'
import { setLoader } from './loading'

export const fetchStats = () => async dispatch => {
  try {
    dispatch(setLoader(true))
    const totals = await axios.get('/api/stats/totals')
    dispatch({
      type: FETCH_STATS,
      payload: totals.data,
    })
    dispatch(setLoader(false))
  } catch (err) {
    // handle error sent by API
    dispatch(setLoader(false))
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
