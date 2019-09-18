import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getApp, updateAppDetails } from './../../actions/apps'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
import { reduxForm, Field, FieldArray } from 'redux-form'
// reactstrap components
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  InputGroup,
} from 'reactstrap'
// core components
import FormCard from '../../components/FormInputs/FormCard'
import { getOptionsUsers } from './../../actions/options'
import { setAlert } from './../../actions/alert'
import InputField from './../../components/FormInputs/InputField'
import PermissionCards from './PermissionTable/PermissionCards'
import AddPerm from './PermissionTable/AddPerm'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

const required = v => {
  if (!v || v === '') {
    return 'This field is required'
  }
  return undefined
}

const EditApplication = ({
  history,
  match,
  handleSubmit,
  getApp,
  getOptionsUsers,
  valid,
  userOptions,
  app,
  updateAppDetails,
}) => {
  useEffect(() => {
    const appId = match.params.id
    const runEffect = async () => {
      await getApp(appId)
      await getOptionsUsers()
      setLoading(false)
    }
    runEffect()
  }, [getApp, getOptionsUsers, match.params.id])

  const [loading, setLoading] = useState(true)

  const onSubmit = values => {
    const appId = match.params.id
    const data = {
      name: values.name,
      comments: values.comments,
      permissions: values.permissions,
    }
    updateAppDetails(appId, data, history)
  }

  return (
    <Container className="mt--7" fluid>
      <Col className="order-xl-1 px-0" xl="12">
        <FormCard
          title={'Edit Application'}
          btnText="Back"
          onClick={history.goBack}
        >
          {loading ? (
            <Row>
              <ScaleLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#11cdef'}
              />
            </Row>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* form section */}
              <h6 className="heading-small text-muted mb-4">
                Application information
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    {/* app name */}
                    <FormGroup>
                      <Row>
                        <label className="form-control-label" htmlFor="name">
                          Application Name
                          <span className="text-danger"> *</span>
                        </label>
                        {/* check validation and render correct icon */}
                      </Row>
                      <InputGroup className="mb-3">
                        <Field
                          component={InputField}
                          name="name"
                          validate={required}
                        ></Field>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    {/* comments */}
                    <FormGroup>
                      <Row>
                        <label
                          className="form-control-label"
                          htmlFor="comments"
                        >
                          Comments
                        </label>
                        {/* check validation and render correct icon */}
                      </Row>
                      <InputGroup className="mb-3">
                        <Field
                          component={InputField}
                          name="comments"
                          type="textarea"
                          rows="6"
                          resize="none"
                        ></Field>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <FieldArray
                name="permissions"
                component={AddPerm}
                appId={app._id}
              />
              <Row className="py-3 mb-3">
                <Col>
                  <div className="card-columns">
                    <FieldArray
                      name="permissions"
                      component={PermissionCards}
                      userOptions={userOptions.options}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-end">
                <Button
                  className="mr-3"
                  color="success"
                  type="submit"
                  disabled={!valid}
                >
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

EditApplication.defaultProps = {
  app: {},
  userOptions: {},
}

EditApplication.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  userOptions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  app: state.apps.appDetails.details,
  userOptions: state.options.userOptions,
  initialValues: state.apps.appDetails.details,
})

export default connect(
  mapStateToProps,
  { getApp, getOptionsUsers, setAlert, updateAppDetails }
)(
  reduxForm({
    form: 'edit-application',
    enableReinitialize: true,
  })(EditApplication)
)
