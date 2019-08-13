import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import company from './company'
import loading from './loading'
import users from './users'
import stats from './stats'

export default combineReducers({ auth, alert, company, loading, users, stats })
