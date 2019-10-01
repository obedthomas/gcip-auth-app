import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './../../actions/auth'
import FormInput from './../FormInputs/FormInput'
import { Redirect } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardBody, Form, Row, Col } from 'reactstrap'

const Login = ({ login, history, auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    login(email, password, history)
  }

  if (auth.isAuthenticated) {
    return <Redirect to="/admin/profile" />
  }

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>
          <Form onSubmit={e => onSubmit(e)}>
            <FormInput
              placeholder="Work Email"
              type="email"
              icon="ni-email-83"
              name="email"
              value={email}
              onChange={onChange}
            />
            <FormInput
              placeholder="Password"
              type="password"
              icon="ni-lock-circle-open"
              name="password"
              value={password}
              onChange={onChange}
            />

            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col xs="6">
          <a className="text-light" href="#!" onClick={e => e.preventDefault()}>
            <small>Forgot password?</small>
          </a>
        </Col>
        <Col className="text-right" xs="6">
          <a className="text-light" href="#!" onClick={e => e.preventDefault()}>
            <small>Create new account</small>
          </a>
        </Col>
      </Row>
    </Col>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { login }
)(Login)
