import {
  FETCH_COMPANIES,
  RECEIVE_COMPANIES,
  FETCH_COMPANIES_FAIL,
} from '../actions/types'

const initalState = {
  companies: [],
  loading: true,
  errors: [],
}

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCH_COMPANIES:
      return { ...state, loading: true }

    case RECEIVE_COMPANIES:
      return { ...state, ...payload, loading: false }

    case FETCH_COMPANIES_FAIL:
      return { ...state, error: payload, loading: false }

    default:
      return state
  }
}
