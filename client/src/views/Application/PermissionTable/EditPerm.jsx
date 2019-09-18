import React from 'react'
import { formValueSelector, FieldArray } from 'redux-form'
// reactstrap components
import { Button, ListGroupItem, Row, Col, ListGroup } from 'reactstrap'
import { connect } from 'react-redux'
import AddUserToPerm from './AddUserToPerm'

const EditPerm = ({ fields, app, pIndex, userOptions }) => {
  return (
    <React.Fragment>
      <Row className="justify-content-md-center">
        <FieldArray
          name={`permissions[${pIndex}].users`}
          component={AddUserToPerm}
          userOptions={userOptions}
          pIndex={pIndex}
        />
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <ListGroup className="list">
            {fields.map((user, i) => (
              <ListGroupItem key={i} className="px-0">
                <Row className="align-items-center justify-content-between  pl-3">
                  <Col className="col-auto">
                    {app[pIndex].users[i].firstName}{' '}
                    {app[pIndex].users[i].lastName}
                  </Col>
                  <Col className="col-auto">
                    <Button
                      className="pr-3"
                      close
                      type="button"
                      onClick={() => fields.remove(i)}
                    />
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const selector = formValueSelector('edit-application')

const mapStateToProps = state => ({
  app: selector(state, 'permissions'),
})

export default connect(mapStateToProps)(EditPerm)

// ${app.permissions[pIndex].users[i].firstName} ${app.permissions[pIndex].users[i].lastName}
