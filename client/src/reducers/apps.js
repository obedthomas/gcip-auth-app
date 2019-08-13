import { FETCH_APPS, RECEIVE_APPS, FAILED_FETCH_APPS } from '../actions/types'

const initalState = {
  apps: [],
  loading: true,
  errors: [],
  editApp: {},
}

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCH_APPS:
      return { ...state, loading: true }

    case RECEIVE_APPS:
      return { ...state, apps: payload, loading: false }

    case FAILED_FETCH_APPS:
      return { ...state, errors: payload, loading: false }

    default:
      return state
  }
}
