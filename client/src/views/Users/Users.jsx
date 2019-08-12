import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// core components
import DashboardHeader from '../../components/Headers/DashboardHeader'
import { getUsers } from '../../actions/users'
import { getCompanies } from '../../actions/company'
import AllUsers from './AllUsers'
import AddUser from './AddUser'

class Users extends Component {
  componentWillMount() {
    this.props.getCompanies()
    this.props.getUsers()
  }

  render() {
    const { users, companies, auth } = this.props
    return (
      <React.Fragment>
        <DashboardHeader />
        <Switch>
          <Route
            path="/admin/users/add-user"
            render={props => <AddUser {...props} companies={companies} />}
          />
          <Route
            path="/"
            render={props => <AllUsers {...props} users={users} auth={auth} />}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

Users.defaultProps = {
  users: {},
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
  companies: state.company,
  auth: state.auth.user,
})

export default connect(
  mapStateToProps,
  { getUsers, getCompanies }
)(Users)
