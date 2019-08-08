import React from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { NavbarBrand, Navbar, Container } from 'reactstrap'

const PublicNavbar = () => {
  return (
    <Navbar
      className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
      expand="md"
    >
      <Container className="px-4">
        <NavbarBrand to="/public/login" tag={Link}>
          <img
            alt="..."
            src={require('../../assets/img/brand/short-logo-white.png')}
          />
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}

export default PublicNavbar
