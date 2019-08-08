import { LOADING, STOP_LOADING } from './types'

export const setLoader = toggle => dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: toggle,
    })
  } catch (err) {
    dispatch({ type: STOP_LOADING })
  }
}
