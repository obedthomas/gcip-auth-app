import { LOAD_USERS } from '../actions/types'

const initialState = {
  users: [],
  loading: true,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USERS:
      payload.forEach(user => {
        if (user.company) {
          const striped = user.company.name
          user.company = striped
        } else {
          user.company = 'Deleted Company'
        }
      })
      return { ...state, users: payload, loading: false }

    default:
      return state
  }
}
