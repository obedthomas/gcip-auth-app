import React, { Fragment } from 'react'
// reactstrap components
import { Container, Row, Col } from 'reactstrap'

const ProfileHeader = ({ user }) => {
  return (
    <Fragment>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '600px',
          backgroundImage:
            'url(' + require('../../assets/img/theme/profile-cover.jpg') + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user.firstName},</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see and edit all your details
                here.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}

export default ProfileHeader
