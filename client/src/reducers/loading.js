import { LOADING, STOP_LOADING } from '../actions/types'

const initialState = {
  showLoader: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, showLoader: payload }

    case STOP_LOADING:
      return { ...state, showLoader: false }

    default:
      return state
  }
}
