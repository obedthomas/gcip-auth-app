import {
  FETCH_USERS,
  RECEIVE_USERS,
  FAILED_FETCH_USERS,
} from '../actions/types'

const initialState = {
  users: [],
  loading: true,
  errors: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USERS:
      return { ...state, loading: true }

    case RECEIVE_USERS:
      payload.forEach(user => {
        if (user.company) {
          const striped = user.company.name
          user.company = striped
        } else {
          user.company = 'Deleted Company'
        }
      })
      return { ...state, users: payload, loading: false }

    case FAILED_FETCH_USERS:
      return { ...state, errors: payload, loading: true }

    default:
      return state
  }
}
