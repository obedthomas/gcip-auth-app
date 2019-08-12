import React from 'react'
import { Link } from 'react-router-dom'
import ReactBSTables from '../../components/Tables/BSTable'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'
//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const AllUsers = ({ users, companies }) => {
  const columns = [
    { dataField: 'firstName', text: 'First Name', sort: true },
    { dataField: 'lastName', text: 'Last Name', sort: true },
    { dataField: 'company', text: 'Company', sort: true },
    { dataField: 'department', text: 'department', sort: true },
    { dataField: 'role', text: 'role', sort: true },
    {
      dataField: 'edit',
      text: '',
      isDummyField: true,
      headerStyle: { width: '100px' },
      sort: false,
    },
  ]

  return (
    <Container className="mt--7" fluid>
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

export default AllUsers
