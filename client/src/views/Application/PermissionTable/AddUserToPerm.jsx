import React, { useEffect, useState } from 'react'
import _ from 'lodash'
// react plugin used to create DropdownMenu for selecting items
import Select2 from 'react-select2-wrapper'
// reactstrap components
import { Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { formValueSelector, arrayPush } from 'redux-form'

const AddUserToPerm = ({ userOptions, pIndex, perms, fields }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    let arr1 = perms[pIndex].users
    let arr2 = userOptions
    let result = _.differenceBy(arr2, arr1, '_id')
    setUsers(result)
  }, [setUsers, perms[pIndex].users, userOptions, pIndex, perms])

  const onOpen = () => {
    let arr1 = perms[pIndex].users
    let arr2 = userOptions
    let result = _.differenceBy(arr2, arr1, '_id')
    setUsers(result)
  }

  const onSelect = e => {
    let u = users.filter(user => user.id === e.target.value)
    let fullName = u[0].text
    let firstName = fullName
      .split(' ')
      .slice(0, -1)
      .toString()
    let lastName = fullName
      .split(' ')
      .slice(-1)
      .toString()
    let user = { _id: e.target.value, firstName, lastName }
    fields.push(user)
  }

  return (
    <>
      <Col sm="10" className="my-4 align-middle pl-0 pr-2">
        <Select2
          className="form-control"
          options={{
            placeholder: 'Add new user',
          }}
          data={users}
          onSelect={e => onSelect(e)}
          onOpen={() => onOpen()}
        />
      </Col>
      <Col sm="2" className="my-4 pl-0 col-auto">
        <Button outline color="primary" type="button" className="h-100">
          <i className="fa fa-plus align-center justify-center" />
        </Button>
      </Col>
    </>
  )
}

AddUserToPerm.defaultProps = {
  userOptions: [],
}

const selector = formValueSelector('edit-application')

const mapStateToProps = state => ({
  perms: selector(state, 'permissions'),
})

export default connect(
  mapStateToProps,
  { arrayPush }
)(AddUserToPerm)
