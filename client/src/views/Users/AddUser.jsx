import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deptOptions, roleOptions } from '../../variables/formOptions'
// reactstrap components
import { Container, Row, Col, Form, Button } from 'reactstrap'
// core componentsw
import FormCard from '../../components/FormInputs/FormCard'
import FormInput from '../../components/FormInputs/FormInput'
import FormSelectInput from '../../components/FormInputs/FormSelectInput'
import passGenerator from '../../utils/passGenerator'
// redux
import { register } from '../../actions/auth'
import { getCompanies } from '../../actions/company'

const AddUser = ({ history, register, companies, getCompanies }) => {
  useEffect(() => {
    if (companies.loading) getCompanies()
  }, [getCompanies, companies])

  const [formData, setFormData] = useState({
    firstName: '',
    firstNameCheck: null,
    lastName: '',
    lastNameCheck: null,
    role: '',
    roleCheck: null,
    department: '',
    departmentCheck: null,
    email: '',
    emailCheck: null,
    company: '',
    companyCheck: '',
    password: passGenerator(8),
  })
  const {
    firstName,
    firstNameCheck,
    lastName,
    lastNameCheck,
    role,
    roleCheck,
    department,
    departmentCheck,
    email,
    emailCheck,
    company,
    companyCheck,
    password,
  } = formData

  const onChange = (e, required, type, length) => {
    const { value, name } = e.target
    // validate Input fields
    if (required && type === 'text' && value.length >= length) {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Check`]: true,
      })
    } else if (required && type === 'email' && /\S+@\S+\.\S+/.test(value)) {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Check`]: true,
      })
    } else if (required && type === 'select' && value.length > 0) {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Check`]: true,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
        [`${name}Check`]: false,
      })
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    const data = {
      firstName,
      lastName,
      role,
      department,
      email,
      company,
      password,
    }
    await register(data, history.push)
  }

  return (
    <React.Fragment>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1 px-0" xl="12">
          <FormCard
            title={'Add New User'}
            btnText="Back"
            onClick={history.goBack}
          >
            <Form onSubmit={onSubmit}>
              {/* form section */}
              <h6 className="heading-small text-muted mb-4">
                User information
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="firstName"
                      value={firstName}
                      valid={firstNameCheck}
                      onChange={onChange}
                      label="First Name"
                      required
                      length={4}
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="lastName"
                      value={lastName}
                      valid={lastNameCheck}
                      onChange={onChange}
                      label="Last Name"
                      required
                      length={4}
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="email"
                      name="email"
                      value={email}
                      valid={emailCheck}
                      onChange={onChange}
                      label="Email"
                      required
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="password"
                      value={password}
                      disabled
                      onChange={onChange}
                      label="Temporary Password"
                    />
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
              {/* form section */}
              <h6 className="heading-small text-muted mb-4">Company Details</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormSelectInput
                      name="company"
                      type="select"
                      value={company}
                      valid={companyCheck}
                      onChange={onChange}
                      label="Company"
                      options={companies.companies}
                      required
                    />
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
    </React.Fragment>
  )
}

AddUser.propTypes = {
  register: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
}

export default connect(
  null,
  { register, getCompanies }
)(AddUser)
