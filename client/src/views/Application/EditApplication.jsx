import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { css } from '@emotion/core'
// reactstrap components
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  Input,
  InputGroup,
} from 'reactstrap'
// core components
import FormCard from '../../components/FormInputs/FormCard'
import FormInput from '../../components/FormInputs/FormInput'
import { getApp } from './../../actions/apps'

//MoonLoader css
const override = css`
  display: block;
  margin: 4rem auto;
`

class EditApplication extends Component {
  async componentWillMount() {
    const { match, getApp } = this.props
    const appId = match.params.id
    await getApp(appId)
    this.setState({ ...this.props.app.details })
  }

  state = {
    ...this.props.app.details,
    nameCheck: null,
    permissionNameCheck: null,
    usersCheck: null,
  }

  onChange = (e, required, type, length) => {
    const { value, name } = e.target
    // validate Input fields
    if (required && type === 'text' && value.length >= length) {
      this.setState({
        ...this.state,
        [name]: value,
        [`${name}Check`]: true,
      })
    } else {
      this.setState({
        ...this.state,
        [name]: value,
        [`${name}Check`]: false,
      })
    }
  }

  onSubmit = async e => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const {
      name,
      nameCheck,
      comments,
      permissionName,
      permissionNameCheck,
      users,
      usersCheck,
    } = this.state
    const { history, app } = this.props

    return (
      <Container className="mt--7" fluid>
        <Col className="order-xl-1 px-0" xl="12">
          <FormCard
            title={'Edit Application'}
            btnText="Back"
            onClick={history.goBack}
          >
            {app.loading ? (
              <Row>
                <ScaleLoader
                  css={override}
                  sizeUnit={'px'}
                  size={60}
                  color={'#11cdef'}
                />
              </Row>
            ) : (
              <Form onSubmit={this.onSubmit}>
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
                        onChange={this.onChange}
                        label="Application Name"
                        required
                        length={4}
                      />
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Row>
                          <label
                            className="form-control-label"
                            htmlFor="comments"
                          >
                            Comments
                          </label>
                        </Row>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            type="textarea"
                            resize="none"
                            id="comments"
                            name="comments"
                            value={comments}
                            rows="6"
                            onChange={e =>
                              this.onChange(e, false, 'textarea', false)
                            }
                          ></Input>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <Row className="py-3">permission table</Row>
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
}

EditApplication.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  app: state.apps.appDetails,
})

export default connect(
  mapStateToProps,
  { getApp }
)(EditApplication)
