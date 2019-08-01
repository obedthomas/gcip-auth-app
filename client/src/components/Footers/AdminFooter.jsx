import React from 'react'
import moment from 'moment'
// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

const AdminFooter = () => {
  const currYear = moment(Date.now()).format('YYYY')
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {currYear} GCIP.Ltd | Created by
            <a
              className="font-weight-bold ml-1"
              href="https://www.toproom.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Toproom Design Ltd
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.gcipltd.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  )
}

export default AdminFooter
