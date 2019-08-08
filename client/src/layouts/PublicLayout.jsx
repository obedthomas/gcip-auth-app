import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './../routes'

import PublicNavbar from '../components/Navbars/PublicNavbar'
import PublicHeader from './../components/Headers/PublicHeader'

//reactstrap
import { Container, Row } from 'reactstrap'
import PublicFooter from '../components/Footers/PublicFooter'

class PublicLayout extends Component {
  // set body color if route is '/public/...'
  componentDidMount() {
    document.body.classList.add('bg-default')
  }
  componentWillUnmount() {
    document.body.classList.remove('bg-default')
  }

  // get public routes and render them dynamically
  getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === '/public') {
        return (
          <Route
            path={
              route.layout +
              route.path +
              (route.path === '/register' ? '/:token' : '')
            }
            component={route.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-content">
          <PublicNavbar />
          <PublicHeader
            title={'Welcome'}
            desc={
              'Please login on register to an account so in order to access our APIs'
            }
          />
          {/* Page Content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
        </div>
        <PublicFooter />
      </React.Fragment>
    )
  }
}

export default PublicLayout
