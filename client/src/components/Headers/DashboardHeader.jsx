import React from 'react'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import StatCard from '../StatCards/StatCard'

const DashboardHeader = () => {
  return (
    <React.Fragment>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <StatCard
                  title="Total Users"
                  stat={8}
                  icon="address-card"
                  color="bg-danger"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Total Users"
                  stat={8}
                  icon="address-card"
                  color="bg-danger"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Total Users"
                  stat={8}
                  icon="address-card"
                  color="bg-danger"
                />
              </Col>
              <Col lg="6" xl="3">
                <StatCard
                  title="Total Users"
                  stat={8}
                  icon="address-card"
                  color="bg-danger"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DashboardHeader
