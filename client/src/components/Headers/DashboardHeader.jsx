import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import StatCard from '../StatCards/StatCard'

const DashboardHeader = ({ stats }) => {
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
                  stat={stats.loading ? 'Loading...' : stats.totals.userTotal}
                  icon="address-card"
                  color="bg-success"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Companies"
                  stat={
                    stats.loading ? 'Loading...' : stats.totals.companyTotal
                  }
                  icon="building"
                  color="bg-warning"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Applications"
                  stat={stats.loading ? 'Loading...' : stats.totals.appTotal}
                  icon="desktop"
                  color="bg-info"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Permissions"
                  stat={stats.loading ? 'Loading...' : stats.totals.permTotal}
                  icon="key"
                  color="bg-primary"
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
  stats: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  stats: state.stats,
})

export default connect(mapStateToProps)(DashboardHeader)
