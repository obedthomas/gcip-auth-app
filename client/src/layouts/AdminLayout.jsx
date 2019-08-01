import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import routes from '../routes.js'
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar'
import AdminFooter from './../components/Footers/AdminFooter'
import AdminSidebar from '../components/Sidebar/AdminSidebar.jsx'
// reactstrap components
import { Container } from 'reactstrap'

class AdminLayout extends Component {
  state = {
    sidenavOpen: true,
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    this.refs.mainContent.scrollTop = 0
  }

  // dynamically renders all routes with '/admin/...'
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  // Gets title text for each component and renders it
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name
      }
    }
    return 'GCIP'
  }
  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      document.body.classList.remove('g-sidenav-hidden')
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen,
    })
  }

  render() {
    const {
      location: { pathname },
      auth: { isAuthenticated },
      user,
    } = this.props

    if (isAuthenticated && user) {
      return (
        <React.Fragment>
          <AdminSidebar
            {...this.props}
            routes={routes}
            toggleSidenav={this.toggleSidenav}
            sidenavOpen={this.state.sidenavOpen}
            logo={{
              innerLink: '/admin/profile',
              imgSrc: require('../assets/img/brand/short-logo.png'),
              imgAlt: 'GCIP',
            }}
          />
          {/* <Sidebar logo={logo} routes={routes} /> */}
          <div className="main-content" ref="mainContent">
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(pathname)}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            <Container fluid>
              <AdminFooter />
            </Container>
          </div>
        </React.Fragment>
      )
    } else return null
  }
}

AdminLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
})

export default connect(mapStateToProps)(AdminLayout)
