import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { css } from '@emotion/core'
import { BarLoader } from 'react-spinners'
import routes from '../routes.js'
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar'
import AdminFooter from './../components/Footers/AdminFooter'
import AdminSidebar from '../components/Sidebar/AdminSidebar.jsx'
// reactstrap components
import { Container } from 'reactstrap'

//BarLoader css
const override = css`
  position: absolute;
  top: 0;
  z-index: 99999;
  display: block;
  margin: 0 auto;
  width: 100vw;
  color: red;
  border-color: red;
`

const AdminLayout = props => {
  const {
    location: { pathname },
    auth: { isAuthenticated },
    user,
    loading,
  } = props

  const [state, setState] = useState({
    sidenavOpen: true,
  })

  const { sidenavOpen } = state

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  })

  // dynamically renders all routes with '/admin/...'
  const getRoutes = routes => {
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
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'GCIP'
  }
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = e => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      document.body.classList.remove('g-sidenav-hidden')
    }
    setState({
      sidenavOpen: !sidenavOpen,
    })
  }

  if (isAuthenticated && user) {
    return (
      <React.Fragment>
        <BarLoader
          css={override}
          sizeUnit={'px'}
          color={'#4553ff'}
          loading={loading}
        />
        <AdminSidebar
          {...props}
          routes={routes}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          logo={{
            innerLink: '/admin/profile',
            imgSrc: require('../assets/img/brand/short-logo.png'),
            imgAlt: 'GCIP',
          }}
        />

        <div className="main-content">
          <AdminNavbar {...props} brandText={getBrandText(pathname)} />
          <Switch>{getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </React.Fragment>
    )
  } else {
    return null
  }
}

AdminLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  loading: state.loading.showLoader,
})

export default connect(mapStateToProps)(AdminLayout)
