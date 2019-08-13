import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactBSTables from '../../components/Tables/BSTable'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
import ConfirmAlert from './../../components/Alerts/ConfirmAlert'
import { deleteCompany } from './../../actions/company'
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
import EditCompany from './EditCompany'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const AllCompanies = ({ companies, deleteCompany, history }) => {
  const [alerts, setAlerts] = useState({
    alert: false,
    id: '',
  })

  const editCompany = company => {
    return history.push({
      pathname: '/admin/companies/edit-company',
      state: { company },
    })
  }

  const onConfirm = () => {
    // make delete call to api
    if (alerts.id) deleteCompany(alerts.id)
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
          <DropdownItem onClick={e => editCompany(row)}>
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
    { dataField: 'name', text: 'Company Name', sort: true },
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
                  <h3 className="mb-0">All Companies</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Link
                    to="/admin/companies/add-company"
                    className="text-white"
                  >
                    <Button color="primary" size="sm">
                      Add
                    </Button>
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            {companies.loading ? (
              <ScaleLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#11cdef'}
              />
            ) : (
              <ReactBSTables data={companies.companies} columns={columns} />
            )}
          </Card>
        </div>
      </Row>
    </Container>
  )
}

AllCompanies.propTypes = {
  companies: PropTypes.object.isRequired,
}

export default connect(
  null,
  { deleteCompany }
)(AllCompanies)
