import React, { useState } from 'react'
// reactstrap components
import { Button, Card, CardBody, Form, Row, Col } from 'reactstrap'
import FormInput from '../FormInputs/FormInput'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    accessCode: '',
    password: '',
    password2: '',
  })

  const {
    firstName,
    lastName,
    email,
    password,
    accessCode,
    password2,
  } = formData

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(formData)
    // do stuff
    // redirect to dashboard
  }

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>
              Sign up with credentials. Access code must be provided by GCIP's
              internal IT Department
            </small>
          </div>
          {/* Form start */}
          <Form role="form" onSubmit={e => onSubmit(e)}>
            <Row form className="py-0">
              {/* First Name */}
              <Col md={6} className="">
                <FormInput
                  placeholder="First Name"
                  type="text"
                  icon="ni-hat-3"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </Col>
              {/* Last Name */}
              <Col md={6} className="">
                <FormInput
                  placeholder="Last Name"
                  type="text"
                  icon="ni-hat-3"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                />
              </Col>
            </Row>
            {/* Email */}
            <FormInput
              placeholder="Work Email"
              type="email"
              icon="ni-email-83"
              name="email"
              value={email}
              onChange={onChange}
            />
            {/* Access Code */}
            <FormInput
              placeholder="Access Code"
              type="text"
              icon="ni-badge"
              name="accessCode"
              value={accessCode}
              onChange={onChange}
            />
            {/* Password */}
            <FormInput
              placeholder="Password"
              type="password"
              icon="ni-lock-circle-open"
              name="password"
              value={password}
              onChange={onChange}
            />
            {/* Confirm Password */}
            <FormInput
              placeholder="Confirm Password"
              type="password"
              icon="ni-lock-circle-open"
              name="password2"
              value={password2}
              onChange={onChange}
            />
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit">
                Create account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Register
