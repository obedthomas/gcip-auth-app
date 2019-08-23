import {
  FETCH_APPS,
  RECEIVE_APPS,
  FAILED_FETCH_APPS,
  FETCH_SINGLE_APP,
  RECEIVE_SINGLE_APP,
  FAILED_FETCH_SINGLE_APP,
} from '../actions/types'

const initalState = {
  apps: [],
  loading: true,
  errors: [],
  appDetails: {
    loading: true,
    details: {},
    errors: [],
  },
}

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCH_APPS:
      return { ...state, loading: true }

    case RECEIVE_APPS:
      return { ...state, apps: payload, loading: false }

    case FAILED_FETCH_APPS:
      return { ...state, errors: payload, loading: false }

    case FETCH_SINGLE_APP:
      return { ...state, appDetails: { loading: true } }

    case RECEIVE_SINGLE_APP:
      return { ...state, appDetails: { loading: false, details: payload } }

    case FAILED_FETCH_SINGLE_APP:
      return { ...state, appDetails: { loading: false, errors: payload } }

    default:
      return state
  }
}
