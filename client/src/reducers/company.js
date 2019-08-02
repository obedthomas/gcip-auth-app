import { ALL_COMPANIES, GET_COMPANIES_FAIL } from '../actions/types'

const initalState = {
  companies: [],
  loading: true,
  error: {},
}

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case ALL_COMPANIES:
      return { ...state, ...payload, loading: false }

    case GET_COMPANIES_FAIL:
      return { ...state, error: payload, loading: false }

    default:
      return state
  }
}
