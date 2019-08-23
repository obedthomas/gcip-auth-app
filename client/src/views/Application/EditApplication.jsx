import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
// reactstrap components
import { Container, Row, Col, Form, Button } from 'reactstrap'
// core components
import FormCard from '../../components/FormInputs/FormCard'
import FormInput from '../../components/FormInputs/FormInput'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const EditApplication = ({ history, app }) => {
  const [formData, setFormData] = useState({
    name: '',
    nameCheck: null,
    comments: '',
    permissionName: '',
    permissionNameCheck: null,
    users: '',
    usersCheck: null,
  })
  const {
    name,
    nameCheck,
    comments,
    permissionName,
    permissionNameCheck,
    users,
    usersCheck,
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
    console.log(formData)
  }

  return (
    <Container className="mt--7" fluid>
      <Col className="order-xl-1 px-0" xl="12">
        <FormCard
          title={'Edit Application'}
          btnText="Back"
          onClick={history.goBack}
        >
          {!app.loading ? (
            <Row>
              <ScaleLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#11cdef'}
              />
            </Row>
          ) : (
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
                      name="name"
                      value={name}
                      valid={nameCheck}
                      onChange={onChange}
                      label="Application Name"
                      required
                      length={4}
                    />
                  </Col>
                  <Col lg="6">
                    <FormInput
                      type="textarea"
                      row="6"
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
          )}
        </FormCard>
      </Col>
    </Container>
  )
}

EditApplication.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  app: state.apps.editApp,
})

export default connect(
  mapStateToProps,
  {}
)(EditApplication)
