import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deptOptions, roleOptions } from '../../variables/formOptions'
// reactstrap components
import {
  FormGroup,
  InputGroup,
  Input,
  Container,
  Row,
  Col,
  Button,
  Form,
} from 'reactstrap'
// Core components
import { editUser } from './../../actions/auth'
import FormInput from './../../components/FormInputs/FormInput'
import FormSelectInput from './../../components/FormInputs/FormSelectInput'
import FormCard from './../../components/FormInputs/FormCard'

const EditUser = ({ history, location, companies, editUser }) => {
  const [formData, setFormData] = useState({
    ...location.state.user,
    companyCheck: '',
    roleCheck: '',
    departmentCheck: '',
  })

  const {
    _id,
    firstName,
    lastName,
    role,
    department,
    email,
    company,
    roleCheck,
    departmentCheck,
  } = formData

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    const companyId = companies.companies.filter(c => c.name === company)
    const submissionData = {
      firstName,
      lastName,
      role,
      department,
      email,
      company: companyId[0]._id,
    }
    await editUser(submissionData, _id, false, history)
  }

  return (
    <Container className="mt--7" fluid>
      <Col>
        <FormCard
          title={'Edit User'}
          btnText="Cancel"
          onClick={() => history.push('/admin/users')}
        >
          <Form onSubmit={e => onSubmit(e)}>
            {/* form section */}
            <h6 className="heading-small text-muted mb-4">User information</h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormInput
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    label="First Name"
                  />
                </Col>
                <Col lg="6">
                  <FormInput
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    label="Last Name"
                  />
                </Col>
                <Col lg="12">
                  <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    label="Email Address"
                  />
                </Col>
              </Row>
            </div>
            <hr className="my-4" />
            {/* form section */}
            <h6 className="heading-small text-muted mb-4">
              Association Details
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Row>
                      <label className="form-control-label" htmlFor="company">
                        Company
                        <span className="text-danger"> *</span>
                      </label>
                    </Row>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        type="select"
                        name="company"
                        value={company}
                        onChange={e => onChange(e, true)}
                      >
                        {companies.companies.map(c => (
                          <option key={c._id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormSelectInput
                    name="department"
                    type="select"
                    value={department}
                    valid={departmentCheck}
                    onChange={onChange}
                    label="Department"
                    options={deptOptions}
                    required
                  />
                </Col>
                <Col lg="6">
                  <FormSelectInput
                    name="role"
                    type="select"
                    value={role}
                    valid={roleCheck}
                    onChange={onChange}
                    label="Role"
                    options={roleOptions}
                    required
                  />
                </Col>
              </Row>
            </div>
            <Row className="justify-content-end">
              <Button className="mr-3" color="success" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </FormCard>
      </Col>
    </Container>
  )
}

export default connect(
  null,
  { editUser }
)(EditUser)
