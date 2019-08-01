import React from 'react'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'

const PublicHeader = ({ title, desc }) => {
  return (
    <div className="header bg-gradient-info py-7 py-lg-8">
      <Container>
        <div className="header-body text-center mb-7">
          <Row className="justify-content-center">
            <Col lg="5" md="6">
              <h1 className="text-white">{title}</h1>
              <p className="text-lead text-light">{desc}</p>
            </Col>
          </Row>
        </div>
      </Container>
      <div className="separator separator-bottom separator-skew zindex-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon className="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
  )
}

export default PublicHeader
