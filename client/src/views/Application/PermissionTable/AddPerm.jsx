import React from 'react'
import uuid from 'uuid'
// reactstrap components
import { Row, Col, Button } from 'reactstrap'

const AddPerm = ({ fields }) => {
  const addPermCard = () => {
    fields.push({
      _id: uuid.v4(),
      permissionName: 'Change Name',
      users: [],
    })
  }

  return (
    <>
      <Row>
        <Col className="col-auto">
          <h6 className="heading-small text-muted mb-0">Permissions</h6>
        </Col>
        <Col>
          <Button
            outline
            size="sm"
            color="success"
            type="button"
            onClick={() => addPermCard()}
          >
            <span>
              <i className="fa fa-plus mr-2" />
            </span>
            Add
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AddPerm
