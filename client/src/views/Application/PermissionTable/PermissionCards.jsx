import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  InputGroup,
  Row,
  Col,
} from 'reactstrap'
import InputField from '../../../components/FormInputs/InputField'
import EditPerm from './EditPerm'
import AddUserToPerm from './AddUserToPerm'

const PermissionCards = ({ fields, userOptions }) => {
  return (
    <React.Fragment>
      {fields.map((permission, i) => (
        <Card key={i}>
          <CardBody>
            <CardTitle className="text-success text-capitalize font-weight-bold">
              <Row className="justify-content-between">
                <InputGroup>
                  <Field
                    component={InputField}
                    name={`${permission}.permissionName`}
                    type="text"
                  ></Field>
                </InputGroup>
              </Row>
            </CardTitle>
            <Row className="pl-2 text-success">
              <small>Users</small>
            </Row>
            {/* map users here */}
            <FieldArray
              name={`${permission}.users`}
              component={EditPerm}
              pIndex={i}
              userOptions={userOptions}
            />
          </CardBody>
          <Row className="my-4 mx-5 justify-content-md-center">
            <Col>
              <Button
                block
                color="danger"
                size="sm"
                onClick={() => fields.remove(i)}
              >
                <span>
                  <i className="fa fa-trash" /> Delete
                </span>
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
    </React.Fragment>
  )
}

export default PermissionCards
