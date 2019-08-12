import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// reactstrap components
import { Container, Row, Col, Form, Button } from 'reactstrap'
// core componentsw
import FormCard from '../../components/FormInputs/FormCard'
import FormInput from '../../components/FormInputs/FormInput'
import FormSelectInput from '../../components/FormInputs/FormSelectInput'
import { addCompany } from '../../actions/company'

const AddCompany = ({ history, addCompany }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyNameCheck: null,
  })
  const { companyName, companyNameCheck } = formData

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
      name: companyName,
    }
    await addCompany(data, history.push)
  }

  return (
    <Container className="mt--7" fluid>
      <Col className="order-xl-1 px-0" xl="12">
        <FormCard
          title={'Add New Company'}
          btnText="Back"
          onClick={history.goBack}
        >
          <Form onSubmit={onSubmit}>
            {/* form section */}
            <h6 className="heading-small text-muted mb-4">
              Company information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormInput
                    type="text"
                    name="companyName"
                    value={companyName}
                    valid={companyNameCheck}
                    onChange={onChange}
                    label="Company Name"
                    required
                    length={4}
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

AddCompany.propTypes = {
  addCompany: PropTypes.func.isRequired,
}

export default connect(
  null,
  { addCompany }
)(AddCompany)
