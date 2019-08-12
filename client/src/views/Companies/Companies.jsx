import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompanies } from '../../actions/company'
// core components
import DashboardHeader from '../../components/Headers/DashboardHeader'
import AllCompanies from './AllCompanies'
import AddCompany from './AddCompany'

const Companies = ({ companies, getCompanies, auth }) => {
  useEffect(() => {
    if (companies.loading) getCompanies()
  }, [companies, getCompanies])

  return (
    <React.Fragment>
      <DashboardHeader />
      <Switch>
        <Route
          path="/admin/companies/add-company"
          render={props => (
            <AddCompany {...props} getCompanies={getCompanies} />
          )}
        />
        <Route
          path="/"
          render={props => <AllCompanies {...props} companies={companies} />}
        />
      </Switch>
    </React.Fragment>
  )
}

Companies.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  companies: state.company,
})

export default connect(
  mapStateToProps,
  { getCompanies }
)(Companies)
