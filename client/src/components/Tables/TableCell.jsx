import React from 'react'

const TableRow = ({ children, th }) => {
  return th ? <th scope="row">{children}</th> : <td>{children}</td>
}

export default TableRow
