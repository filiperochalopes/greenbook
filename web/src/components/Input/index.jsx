import InputContainer from "./styles";

import PropTypes from "prop-types";

const Input = ({
  type,
  name,
  label,
  placeholder,
  description,
  formik,
  required,
  multiline,
  onBlur,
  onChange,
  onFocus,
  disabled,
}) => (
  <InputContainer>
    <label to={name}>
      {label || placeholder} {required && <span>*</span>}
    </label>
    {description && <p>{description}</p>}
    {!multiline ? (
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => {
          formik?.handleChange(e);
          if (onChange) onChange(e);
        }}
        onBlur={(e) => {
          formik?.handleBlur(e);
          if (onBlur) onBlur(e);
        }}
        onFocus={onFocus}
        required={required}
        value={formik?.values[name]}
        disabled={disabled}
      />
    ) : (
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={(e) => {
          formik?.handleChange(e);
          if (onChange) onChange(e);
        }}
        onBlur={(e) => {
          formik?.handleBlur(e);
          if (onBlur) onBlur(e);
        }}
        onFocus={onFocus}
        required={required}
      >
        {formik?.values[name]}
      </textarea>
    )}
    {formik?.errors[name] && formik.touched[name] && (
      <span className="error">{formik.errors[name]}</span>
    )}
  </InputContainer>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  formik: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  placeholder: "Digite seu texto aqui",
  required: false,
  multiline: false,
  disabled: false,
};

export default Input;
