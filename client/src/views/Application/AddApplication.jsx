import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// reactstrap components
import { Container, Row, Col, Form, Button } from 'reactstrap'
// core components
import FormCard from '../../components/FormInputs/FormCard'
import FormInput from '../../components/FormInputs/FormInput'
import { addApp } from '../../actions/apps'

const AddApplication = ({ history, addApp }) => {
  const [formData, setFormData] = useState({
    appName: '',
    appNameCheck: null,
    comments: '',
  })
  const { appName, appNameCheck, comments } = formData

  const onChange = (e, required, type, length) => {
    const { value, name } = e.target
    // validate Input fields
    if (required && type === 'text' && value.length >= length) {
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
      name: appName,
      comments,
    }
    const send = await addApp(data)
    return send ? history.push('/admin/applications') : null
  }

  return (
    <Container className="mt--7" fluid>
      <Col className="order-xl-1 px-0" xl="12">
        <FormCard
          title={'Add New Application'}
          btnText="Back"
          onClick={history.goBack}
        >
          <Form onSubmit={onSubmit}>
            {/* form section */}
            <h6 className="heading-small text-muted mb-4">
              Application information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormInput
                    type="text"
                    name="appName"
                    value={appName}
                    valid={appNameCheck}
                    onChange={onChange}
                    label="Application Name"
                    required
                    length={4}
                  />
                </Col>
                <Col lg="6">
                  <FormInput
                    type="textarea"
                    rows="6"
                    resize="none"
                    name="comments"
                    value={comments}
                    onChange={onChange}
                    label="Comments"
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

AddApplication.propTypes = {
  addApp: PropTypes.func.isRequired,
}

export default connect(
  null,
  { addApp }
)(AddApplication)
