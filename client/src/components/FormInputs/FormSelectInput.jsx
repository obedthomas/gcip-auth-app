import React from 'react'
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup,
  Row,
} from 'reactstrap'

const FormSelectInput = ({
  placeholder,
  icon,
  name,
  value,
  onChange,
  label,
  options,
  required,
  valid,
  type,
}) => {
  // adds feedback icon if field has been blurred and props.valid is true
  const validationIcon = () => {
    if (valid === true) {
      return <i className={`ni ni-check-bold text-success pl-2 pt-1`} />
    } else if (valid === false) {
      return (
        <i className={`fa fa-exclamation-triangle text-danger pl-2 pt-1`} />
      )
    } else return null
  }

  // dynamically render options passed in from parent component
  const renderOptions = () => {
    return options.map(option => (
      <option key={option.title} value={option.title.toLowerCase()}>
        {option.title}
      </option>
    ))
  }

  return (
    <FormGroup>
      {label && (
        <Row>
          <label className="form-control-label" htmlFor={name}>
            {label}
            {required && <span className="text-danger"> *</span>}
          </label>
          {/* check validation and render correct icon */}
          {validationIcon()}
        </Row>
      )}
      <InputGroup className="input-group-alternative mb-3">
        {icon && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={`ni ${icon}`} />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          placeholder={placeholder}
          type="select"
          id={name}
          name={name}
          value={value}
          onChange={e => onChange(e, required, type)}
        >
          <option></option>
          {renderOptions()}
        </Input>
      </InputGroup>
    </FormGroup>
  )
}

export default FormSelectInput
