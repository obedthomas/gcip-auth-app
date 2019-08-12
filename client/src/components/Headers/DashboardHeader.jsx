import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import StatCard from '../StatCards/StatCard'
import { getUsers } from './../../actions/users'
import { getCompanies } from './../../actions/company'

const DashboardHeader = ({ users, companies, getUsers, getCompanies }) => {
  useEffect(() => {
    if (!users.users) getUsers()
    if (!companies.companies) getCompanies()
  }, [getUsers, getCompanies])

  return (
    <React.Fragment>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <StatCard
                  title="Users"
                  stat={!users.loading ? users.users.length : 0}
                  icon="address-card"
                  color="bg-success"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Companies"
                  stat={!companies.loading ? companies.companies.length : 0}
                  icon="building"
                  color="bg-warning"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Companies"
                  stat={8}
                  icon="address-card"
                  color="bg-warning"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Total Users"
                  stat={8}
                  icon="address-card"
                  color="bg-info"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

DashboardHeader.propTypes = {
  users: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
  companies: state.company,
})

export default connect(
  mapStateToProps,
  { getUsers, getCompanies }
)(DashboardHeader)
