import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getCompanies } from './../actions/company'
import { editUser } from '../actions/auth'
import { setAlert } from './../actions/alert'
import { deptOptions, roleOptions } from '../variables/formOptions'
// reactstrap components
import { Form, Container, Row, Col } from 'reactstrap'
// core componenets
import ProfileHeader from '../components/Headers/ProfileHeader'
import FormCard from '../components/FormInputs/FormCard'
import FormInput from '../components/FormInputs/FormInput'
import FormSelectInput from './../components/FormInputs/FormSelectInput'

const Profile = ({ user, getCompanies, companies, setAlert, editUser }) => {
  const [formData, setFormData] = useState({
    ...user,
    companyCheck: '',
    roleCheck: '',
    departmentCheck: '',
  })

  const {
    firstName,
    lastName,
    role,
    department,
    email,
    company,
    companyCheck,
    roleCheck,
    departmentCheck,
  } = formData

  const [editState, setEditState] = useState({
    edit: false,
  })
  const { edit } = editState

  useEffect(() => {
    if (companies.loading) getCompanies()
  }, [getCompanies, companies])

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onEdit = e => {
    e.preventDefault()
    if (user.role === 'Admin') {
      setEditState({ ...editState, edit: !edit })
    } else {
      return setAlert('You must be an Admin user to change details', 'danger')
    }
    // save
    if (edit) {
      return editUser(formData, user._id, true)
    }
  }

  return (
    <div>
      <ProfileHeader user={user} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="8">
          <FormCard
            title={'My Profile'}
            btnText="Edit"
            onClick={e => onEdit(e)}
            secondBtnText="Save"
            secondBtnState={edit}
          >
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
                      disabled={!edit}
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      label="Last Name"
                      disabled={!edit}
                    />
                  </Col>
                  <Col lg="12">
                    <FormInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      label="Email Address"
                      disabled={!edit}
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
                    <FormSelectInput
                      name="company"
                      type="select"
                      value={company._id}
                      valid={companyCheck}
                      onChange={onChange}
                      label="Company"
                      options={companies.companies}
                      disabled={!edit}
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
                      disabled={!edit}
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
                      disabled={!edit}
                      required
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
  user: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  companies: state.company,
})

export default connect(
  mapStateToProps,
  { getCompanies, setAlert, editUser }
)(Profile)
