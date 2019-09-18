import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import alert from './alert'
import company from './company'
import loading from './loading'
import users from './users'
import stats from './stats'
import apps from './apps'
import options from './options'

export default combineReducers({
  form: formReducer,
  auth,
  alert,
  company,
  loading,
  users,
  stats,
  apps,
  options,
})
