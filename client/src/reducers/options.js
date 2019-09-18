import {
  FETCH_OPTIONS_USERS,
  RECEIVE_OPTIONS_USERS,
  FAILED_FETCH_OPTIONS_USERS,
} from '../actions/types'

const initialState = {
  userOptions: {
    options: [],
    loading: true,
  },
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_OPTIONS_USERS:
      return { ...state, userOptions: { loading: true } }

    case RECEIVE_OPTIONS_USERS:
      return { ...state, userOptions: { options: payload, loading: false } }

    case FAILED_FETCH_OPTIONS_USERS:
      return { ...state, userOptions: { loading: false } }

    default:
      return state
  }
}
