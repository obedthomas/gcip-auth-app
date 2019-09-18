import React from 'react'
// reactstrap components
import { Input } from 'reactstrap'

const InputField = ({ input, type, rows, resize }) => {
  return <Input {...input} type={type} rows={rows} resize={resize} />
}

export default InputField
