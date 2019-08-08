import React from 'react'

const TableHead = ({ headers }) => {
  return (
    <thead className="thead-light">
      <tr>
        {headers.map((header, i) => (
          <th key={i} scope="col">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
