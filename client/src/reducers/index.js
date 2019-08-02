import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import company from './company'

export default combineReducers({ auth, alert, company })
