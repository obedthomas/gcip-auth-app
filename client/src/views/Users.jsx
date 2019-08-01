import React from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Col,
  Button,
} from 'reactstrap'
// core components
import DashboardHeader from '../components/Headers/DashboardHeader'
import TableHead from '../components/Tables/TableHead'
import TableBody from '../components/Tables/TableBody'

const Users = () => {
  return (
    <React.Fragment>
      <DashboardHeader />
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
              <Table className="align-items-center table-flush" responsive>
                <TableHead />
                <TableBody />
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Users
