import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getApps } from './../../actions/apps'
// core components
import DashboardHeader from '../../components/Headers/DashboardHeader'
import AddApplication from './AddApplication'
import EditApplication from './EditApplication'
import AllApplications from './AllApplications'

const Applications = ({ apps, getApps }) => {
  useEffect(() => {
    getApps()
  }, [getApps])

  return (
    <React.Fragment>
      <DashboardHeader />
      <Switch>
        <Route
          path="/admin/applications/add-application"
          render={props => <AddApplication {...props} />}
        />
        <Route
          path="/admin/applications/edit-application"
          render={props => <EditApplication {...props} />}
        />
        <Route
          path="/"
          render={props => <AllApplications {...props} apps={apps} />}
        />
      </Switch>
    </React.Fragment>
  )
}

Applications.propTypes = {
  apps: PropTypes.object.isRequired,
  getApps: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  apps: state.apps,
})

export default connect(
  mapStateToProps,
  { getApps }
)(Applications)
