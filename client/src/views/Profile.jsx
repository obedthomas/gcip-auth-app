import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
// reactstrap components
import { Form, Container, Row, Col } from 'reactstrap'
// core componenets
import ProfileHeader from '../components/Headers/ProfileHeader'
import FormCard from '../components/FormInputs/FormCard'
import FormInput from '../components/FormInputs/FormInput'

const Profile = ({ auth }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    department: '',
    email: '',
    password: '',
  })
  const { firstName, lastName, role, department, email } = formData

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <ProfileHeader user={auth.user} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="8">
          <FormCard title={'My Profile'} btnText="Edit">
            <Form>
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
                Department Details
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="department"
                      value={department}
                      onChange={onChange}
                      label="Department"
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="role"
                      value={role}
                      onChange={onChange}
                      label="Role"
                    />
                  </Col>
                </Row>
              </div>
            </Form>
          </FormCard>
        </Col>
      </Container>
    </div>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Profile)