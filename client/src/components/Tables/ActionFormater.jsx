import React from 'react'
import PropTypes from 'prop-types'
// reactstrap components
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

const ActionFormater = ({ row, editItem, deleteItem }) => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className="btn-icon-only text-light"
        color=""
        role="button"
        size="sm"
      >
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        <DropdownItem onClick={() => editItem(row)}>
          <span className="text-primary">
            <i className="fa fa-edit mr-2"></i> Edit
          </span>
        </DropdownItem>
        <DropdownItem onClick={() => deleteItem(row._id)}>
          <span className="text-danger">
            <i className="fa fa-trash mr-2"></i> Delete
          </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

ActionFormater.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
}

export default ActionFormater
