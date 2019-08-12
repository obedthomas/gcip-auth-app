import React from 'react'
// react component used to create sweet alerts
import ReactBSAlert from 'react-bootstrap-sweetalert'

const ConfirmAlert = ({ text, onConfirm, onCancel }) => {
  return (
    <ReactBSAlert
      warning
      style={{ display: 'block', marginTop: '-100px' }}
      title="Warning!"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmBtnBsStyle="warning"
      confirmBtnText="Yes"
      btnSize=""
    >
      {text}
    </ReactBSAlert>
  )
}

export default ConfirmAlert
