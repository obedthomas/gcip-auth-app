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

const FormInput = ({
  placeholder,
  type,
  icon,
  name,
  value,
  onChange,
  label,
  length,
  required,
  valid,
  disabled,
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

  const autocompleteCheck = () => {
    switch (type) {
      case 'password':
        return 'current-password'

      case 'username':
        return 'username'

      case 'email':
        return 'username'

      default:
        return false
    }
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
          autocomplete={autocompleteCheck()}
          placeholder={placeholder}
          type={type}
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          onChange={e => onChange(e, required, type, length)}
        ></Input>
        <div className="valid-feedback">Looks good!</div>
      </InputGroup>
    </FormGroup>
  )
}

export default FormInput
