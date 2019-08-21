import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactBSTables from '../../components/Tables/BSTable'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
import ConfirmAlert from './../../components/Alerts/ConfirmAlert'
import ActionFormater from './../../components/Tables/ActionFormater'
// reactstrap components
import { Card, CardHeader, Container, Row, Col, Button } from 'reactstrap'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const AllApplications = ({ apps, deleteApp, history }) => {
  const [alerts, setAlerts] = useState({
    alert: false,
    id: '',
  })

  const data = [...apps.apps]
  data.forEach(app => (app['permissionCount'] = app.permissions.length))

  const editApp = app => {
    return history.push({
      pathname: '/admin/applications/edit-application',
      state: { app },
    })
  }

  const onConfirm = () => {
    // make delete call to api
    if (alerts.id) console.log('sent')

    // reset alert state
    return setAlerts({ alert: false, id: '' })
  }

  const onCancel = () => {
    // return alert state
    return setAlerts({ alert: false, id: '' })
  }

  const confirmDelete = id => {
    //open confirmation modal
    return setAlerts({ alert: true, id })
  }

  const actionFormater = (cell, row, rowIndex) => {
    return (
      <ActionFormater row={row} editItem={editApp} deleteItem={confirmDelete} />
    )
  }

  const columns = [
    { dataField: 'name', text: 'Application Name', sort: true },
    {
      dataField: 'comments',
      text: 'Comments',
      sort: false,
      style: (cell, row, i, cI) => {
        return { whiteSpace: 'normal' }
      },
    },
    { dataField: 'permissionCount', text: 'Permissions', sort: true },
    {
      dataField: 'edit',
      text: '',
      formatter: actionFormater,
      isDummyField: true,
      headerStyle: { width: '100px' },
      sort: false,
    },
  ]

  return (
    <Container className="mt--7" fluid>
      {/* confirm alert */}
      {alerts.alert && (
        <ConfirmAlert
          text="Are you sure you want to delete this application?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">All Applications</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Link
                    to="/admin/applications/add-application"
                    className="text-white"
                  >
                    <Button color="primary" size="sm">
                      Add
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            {apps.loading ? (
              <ScaleLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#11cdef'}
              />
            ) : (
              <ReactBSTables data={data} columns={columns} />
            )}
          </Card>
        </div>
      </Row>
    </Container>
  )
}

AllApplications.propTypes = {
  apps: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  apps: state.apps,
})

export default connect(
  mapStateToProps,
  {}
)(AllApplications)
