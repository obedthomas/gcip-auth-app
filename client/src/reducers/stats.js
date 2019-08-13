import { FETCH_STATS } from '../actions/types'

const initialState = {
  totals: {
    companyTotal: null,
    userTotal: null,
    appTotal: null,
  },
  loading: true,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STATS:
      return { ...state, totals: payload, loading: false }

    default:
      return state
  }
}
