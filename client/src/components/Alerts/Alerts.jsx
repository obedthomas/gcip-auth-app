import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// reactstrap components
import { UncontrolledAlert, Container, Row } from 'reactstrap'

const Alerts = ({ alerts, history: { location } }) => {
  // workout the left position for container.
  let containerPosition = '100%'
  if (location.pathname.includes('/admin')) containerPosition = '90%'

  // render alert component
  if (alerts !== null && alerts.length > 0) {
    return (
      <Container
        fluid
        style={{
          position: 'absolute',
          top: '5%',
          zIndex: '9999',
          right: 0,
          width: containerPosition,
        }}
      >
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert, i) => {
            // conditonally shows aler icon
            let icon = ''
            switch (alert.alertType) {
              case 'danger':
                icon = 'exclamation-circle'
                break

              case 'success':
                icon = 'check-circle'
                break

              default:
                icon = 'exclamation'
                break
            }

            // render alert component
            return (
              <Row xs="6" className="justify-content-md-center" key={alert.id}>
                <UncontrolledAlert
                  className={`alert-${alert.alertType}`}
                  style={{ width: '40%' }}
                  fade
                >
                  <span className="alert-inner--icon">
                    <i className={`fa fa-${icon}`} />
                  </span>
                  <span className="alert-inner--text pl-2">{`  ${alert.msg}`}</span>
                </UncontrolledAlert>
              </Row>
            )
          })}
      </Container>
    )
  } else return null
}

Alerts.propTypes = {
  alerts: PropTypes.array,
}

const mapStateToProps = state => ({
  alerts: state.alert,
})

export default withRouter(connect(mapStateToProps)(Alerts))
