import React, { useState } from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { Container, Row, Col, Button, Form } from 'reactstrap'
// Core components
import FormInput from './../../components/FormInputs/FormInput'
import FormCard from './../../components/FormInputs/FormCard'
import { editCompany as editComp } from '../../actions/company'

const EditCompany = ({ history, location, editComp }) => {
  const [formData, setFormData] = useState({
    ...location.state.company,
    companyCheck: '',
  })

  const { _id, name } = formData

  const onChange = e => {
    e.preventDefault()
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    await editComp({ _id, name })
    history.push('/admin/companies')
  }

  return (
    <Container className="mt--7" fluid>
      <Col>
        <FormCard
          title={'Edit Company'}
          btnText="Cancel"
          onClick={() => history.push('/admin/companies')}
        >
          <Form onSubmit={e => onSubmit(e)}>
            {/* form section */}
            <h6 className="heading-small text-muted mb-4">
              Company information
            </h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormInput
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    label="Company Name"
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
  { editComp }
)(EditCompany)
