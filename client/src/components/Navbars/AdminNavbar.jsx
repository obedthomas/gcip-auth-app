import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { logout } from '../../actions/auth'
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Container,
  Media,
} from 'reactstrap'

const AdminNavbar = ({ brandText, user, logout }) => {
  return (
    <React.Fragment>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
        expand="md"
        id="navbar-main"
      >
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {brandText}
          </Link>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="Logo"
                    src={require('../../assets/img/brand/symbol.png')}
                    style={{ width: '47px' }}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold text-white">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/" tag={Link} onClick={logout}>
                <i className="ni ni-button-power" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

AdminNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  { logout }
)(AdminNavbar)
