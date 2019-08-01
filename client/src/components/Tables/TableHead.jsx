import React from 'react'

const TableHead = ({ headers }) => {
  return (
    <thead className="thead-light">
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Company</th>
        <th scope="col">Department</th>
        <th scope="col">Role</th>
        <th scope="col" />
      </tr>
    </thead>
  )
}

export default TableHead
