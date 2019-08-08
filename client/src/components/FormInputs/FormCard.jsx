import React from 'react'
import PropTypes from 'prop-types'
// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'

const FormCard = ({
  title,
  children,
  btnText,
  onClick,
  secondBtnText,
  secondBtnState,
}) => {
  return (
    <Card className="bg-secondary shadow">
      {/* Header */}
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">{title}</h3>
          </Col>
          <Col className="text-right" xs="4">
            <Button
              color={!secondBtnState ? 'primary' : 'success'}
              onClick={e => onClick(e)}
              size="sm"
            >
              {!secondBtnState ? btnText : secondBtnText}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      {/* Body */}
      <CardBody>{children}</CardBody>
    </Card>
  )
}

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
}

export default FormCard
