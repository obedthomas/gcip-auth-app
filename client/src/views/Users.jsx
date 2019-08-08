import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// reactstrap components
import { Card, CardHeader, Container, Row, Col, Button } from 'reactstrap'
// core components
import DashboardHeader from '../components/Headers/DashboardHeader'
import { getUsers } from './../actions/users'
import { getCompanies } from './../actions/company'
import ReactBSTables from '../components/Tables/BSTable'

class Users extends Component {
  componentWillMount() {
    this.props.getCompanies()
    this.props.getUsers()
  }

  render() {
    const { users } = this.props

    const columns = [
      { dataField: 'firstName', text: 'First Name', sort: true },
      { dataField: 'lastName', text: 'Last Name', sort: true },
      { dataField: 'company', text: 'Company', sort: true },
      { dataField: 'department', text: 'department', sort: true },
      { dataField: 'role', text: 'role', sort: true },
      { dataField: 'edit', text: '', sort: false },
    ]

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
                {/* add loading spinner here */}
                {!users.loading && (
                  <ReactBSTables data={users.users} columns={columns} />
                )}
              </Card>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    )

    // return (
    //   <React.Fragment>
    //     <DashboardHeader />
    //     <Container className="mt--7" fluid>
    //       <Row>
    //         <div className="col">
    // <Card className="shadow">
    //   <CardHeader className="border-0">
    //     <Row className="align-items-center">
    //       <Col xs="8">
    //         <h3 className="mb-0">All Users</h3>
    //       </Col>
    //       <Col className="text-right" xs="4">
    //         <Link to="/admin/users/add-user" className="text-white">
    //           <Button color="primary" size="sm">
    //             Add
    //           </Button>
    //         </Link>
    //       </Col>
    //     </Row>
    //   </CardHeader>
    //             {/* add loading spinner here */}
    //             <Table className="align-items-center table-flush" responsive>
    //               <TableHead headers={headers} />
    //               <tbody className="list">
    //                 {users.users.map(user => (
    //                   <tr key={user._id}>
    //                     <th>{user.firstName}</th>
    //                     <th>{user.lastName}</th>
    //                     <td>
    //                       {companies.map(company => {
    //                         if (company._id === user.company)
    //                           return company.name
    //                       })}
    //                     </td>
    //                     <td>{user.department}</td>
    //                     <td>{user.role}</td>
    //                     <td>EDIT</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </Table>
    //           </Card>
    //         </div>
    //       </Row>
    //     </Container>
    //   </React.Fragment>
    // )
  }
}

Users.defaultProps = {
  users: {},
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
  companies: state.company.companies,
})

export default connect(
  mapStateToProps,
  { getUsers, getCompanies }
)(Users)
