import React from 'react'

import TableRow from './TableRow'

const TableBody = ({ users }) => {
  return (
    <tbody>
      {/* map over each table row here */}
      {users.map(user => (
        <TableRow />
      ))}
    </tbody>
  )
}

export default TableBody
