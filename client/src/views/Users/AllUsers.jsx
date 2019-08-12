import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactBSTables from '../../components/Tables/BSTable'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { setAlert } from '../../actions/alert'
import ConfirmAlert from '../../components/Alerts/ConfirmAlert'
import { deleteUser } from '../../actions/users'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const AllUsers = ({ users, auth, setAlert, deleteUser, history }) => {
  const [alerts, setAlerts] = useState({
    alert: false,
    id: '',
  })

  const editUser = user => {
    return history.push({
      pathname: '/admin/users/edit-user',
      state: { user },
    })
  }

  const onConfirm = () => {
    // make delete call to api
    if (alerts.id) deleteUser(alerts.id)
    // reset alert state
    return setAlerts({ alert: false, id: '' })
  }

  const onCancel = () => {
    // return alert state
    return setAlerts({ alert: false, id: '' })
  }

  const confirmDelete = id => {
    // check if id matches the current user
    if (id === auth._id)
      return setAlert(
        'You must delete your own account on the profile page',
        'danger'
      )
    //open confirmation modal
    return setAlerts({ alert: true, id })
  }

  const actionFormater = (cell, row, rowIndex) => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle
          className="btn-icon-only text-light"
          color=""
          role="button"
          size="sm"
        >
          <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem onClick={() => editUser(row)}>
            <span className="text-primary">
              <i className="fa fa-edit mr-2"></i> Edit
            </span>
          </DropdownItem>
          <DropdownItem onClick={() => confirmDelete(row._id)}>
            <span className="text-danger">
              <i className="fa fa-trash mr-2"></i> Delete
            </span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

  const columns = [
    { dataField: 'firstName', text: 'First Name', sort: true },
    { dataField: 'lastName', text: 'Last Name', sort: true },
    { dataField: 'company', text: 'Company', sort: true },
    { dataField: 'department', text: 'department', sort: true },
    { dataField: 'role', text: 'role', sort: true },
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
      {alerts.alert && (
        <ConfirmAlert
          text="Are you sure you want to delete this user?"
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
                  <h3 className="mb-0">All Users</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Link to="/admin/users/add-user" className="text-white">
                    <Button color="primary" size="sm">
                      Add
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            {users.loading ? (
              <ScaleLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#11cdef'}
              />
            ) : (
              <ReactBSTables data={users.users} columns={columns} />
            )}
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default connect(
  null,
  { setAlert, deleteUser }
)(AllUsers)
