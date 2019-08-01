import React from 'react'
// reactstrap components
import { Media } from 'reactstrap'

import TableCell from './TableCell'

const TableRow = () => {
  return (
    <React.Fragment>
      <tr>
        <TableCell th>Obed</TableCell>
        <TableCell th>Thomas</TableCell>
        <TableCell>
          <Media className="align-items-center">
            <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                src={require('../../assets/img/theme/bootstrap.jpg')}
              />
            </a>
            <Media>
              <span className="mb-0 text-sm">GCIP.Ltd</span>
            </Media>
          </Media>
        </TableCell>
        <TableCell>IT</TableCell>
        <TableCell>Admin</TableCell>
      </tr>
    </React.Fragment>
  )
}

export default TableRow
