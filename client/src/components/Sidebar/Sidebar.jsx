import React, { useState } from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap'

const Sidebar = ({ routes, logo }) => {
  const [collapse, setCollapse] = useState({
    collapseOpen: false,
  })
  const { collapseOpen } = collapse
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapse({ collapseOpen: !collapseOpen })
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapse({ collapseOpen: false })
  }
  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show')
    }
  }
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show')
    }
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      this.props.toggleSidenav()
    }
  }

  // creates the links that appear in the left menu / Sidebar
  const createLinks = routes => {
    return routes
      .filter(route => route.hide !== true)
      .map((prop, key) => {
        if (prop.layout === '/admin') {
          return (
            <NavItem key={key}>
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <i className={prop.icon} />
                {prop.name}
              </NavLink>
            </NavItem>
          )
        } else {
          return null
        }
      })
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        <NavbarBrand className="pt-0" tag={Link} to="/admin/profile">
          <img alt="Logo" className="navbar-brand-img" src={logo} />
        </NavbarBrand>
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-circle-08" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem to="/" tag={Link} onClick={e => e.preventDefault()}>
                <i className="ni ni-button-power" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/admin/dashboard">
                  <img src={logo} alt="Logo" />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar
