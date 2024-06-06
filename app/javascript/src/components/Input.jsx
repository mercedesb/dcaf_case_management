import React from "react";

export default Input = ({
  label,
  name,
  id,
  type = "text",
  value,
  required,
  help,
  className,
  labelClassName,
  autocomplete = "off",
  onChange,
  tooltip,
  ...props
}) => {
  const labelClassNames = `${required ? 'required' : ''} ${labelClassName || ''}`
  const inputClassNames = `form-control ${className || ''} ${labelClassNames.includes('sr-only') ? 'mt-6' : ''}`

  if (!!onChange) {
    props["value"] = value || ""
  } else {
    props["defaultValue"] = value || ""
  }

  return (
    <div className="form-group">
      <label className={labelClassNames} htmlFor={id}>
        {label}
        {tooltip}
      </label>
      <input type={type} name={name} id={id} required={required} autoComplete={autocomplete} className={inputClassNames} onChange={onChange} {...props}></input>
      {help && <small className="form-text text-muted">{help}</small>}
    </div>
  )
};