import React, { useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'

import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

// plugins styles from node_modules
import 'react-notification-alert/dist/animate.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
// plugins styles downloaded
import './assets/vendor/fullcalendar/dist/fullcalendar.min.css'
import './assets/vendor/sweetalert2/dist/sweetalert2.min.css'
import './assets/vendor/select2/dist/css/select2.min.css'
import './assets/vendor/quill/dist/quill.core.css'
import './assets/vendor/nucleo/css/nucleo.css'
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
// core styles
import './assets/scss/argon-dashboard-pro-react.scss?v1.0.0'

//Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import Alerts from './components/Alerts/Alerts'
import PrivateRoute from './utils/PrivateRoute'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Alerts />
      <Switch>
        <Route path="/public" render={props => <PublicLayout {...props} />} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/public/login" />
      </Switch>
    </Provider>
  )
}

export default App
