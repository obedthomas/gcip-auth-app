import React from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap'

const PublicNavbar = () => {
  return (
    <Navbar
      className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
      expand="md"
    >
      <Container className="px-4">
        <NavbarBrand to="/" tag={Link}>
          <img
            alt="..."
            src={require('../../assets/img/brand/short-logo-white.png')}
          />
        </NavbarBrand>
        {/* dropdown menu for mobile */}
        <button className="navbar-toggler" id="navbar-collapse-main">
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  <img
                    alt="..."
                    src={require('../../assets/img/brand/short-logo.png')}
                  />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" id="navbar-collapse-main">
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
        </UncontrolledCollapse>
        {/* Navigation Link */}
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="nav-link-icon" to="/public/register" tag={Link}>
              <i className="ni ni-circle-08" />
              <span className="nav-link-inner--text">Register</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link-icon" to="/public/login" tag={Link}>
              <i className="ni ni-key-25" />
              <span className="nav-link-inner--text">Login</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default PublicNavbar
