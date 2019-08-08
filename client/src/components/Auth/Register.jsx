import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { activate } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
// reactstrap components
import { Button, Card, CardBody, Form, Col } from 'reactstrap'
import FormInput from '../FormInputs/FormInput'

const Register = ({ match, history, activate, setAlert }) => {
  const [formData, setFormData] = useState({
    tempPassword: '',
    newPassword: '',
    confirmPassword: '',
    token: '',
  })
  const { tempPassword, newPassword, confirmPassword } = formData

  useEffect(() => {
    setFormData({ ...formData, token: match.params.token })
  }, [formData, match.params.token])

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (newPassword !== confirmPassword)
      return setAlert("Passwords don't match", 'danger')
    if (tempPassword.length === 0)
      return setAlert('Please enter your temporary password', 'danger')

    activate(formData, history.push)
  }

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>
              Sign up with credentials. Your temporary password is provided in
              the account activation email.
            </small>
          </div>
          {/* Form start */}
          <Form role="form" onSubmit={e => onSubmit(e)}>
            {/* Temp Password */}
            <FormInput
              placeholder="Temporary Password"
              type="text"
              icon="ni-badge"
              name="tempPassword"
              value={tempPassword}
              onChange={onChange}
            />
            {/* Password */}
            <FormInput
              placeholder="New Password"
              type="password"
              icon="ni-lock-circle-open"
              name="newPassword"
              value={newPassword}
              onChange={onChange}
            />
            {/* Confirm Password */}
            <FormInput
              placeholder="Confirm Password"
              type="password"
              icon="ni-lock-circle-open"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit">
                Activate account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

Register.propTypes = {
  activate: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect(
  null,
  { activate, setAlert }
)(Register)
