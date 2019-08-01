import React from 'react'
// reactstrap components
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap'

const StatCard = ({ icon, title, stat, color }) => {
  return (
    <Card className="card-stats mb-4 mb-xl-0">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {title}
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">{stat}</span>
          </div>
          <Col className="col-auto">
            <div
              className={`icon icon-shape ${color} text-white rounded-circle shadow`}
            >
              <i className={`fas fa-${icon}`} />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default StatCard
