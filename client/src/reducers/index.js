import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import company from './company'
import loading from './loading'
import users from './users'

export default combineReducers({ auth, alert, company, loading, users })
