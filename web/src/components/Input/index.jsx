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
  onBlur,
  onChange,
  onFocus,
  disabled,
}) => {
  // Extrair valor aninhado de formik.values
  const getValue = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
  const value = getValue(formik.values, name);

  return (
  <InputContainer>
    <label to={name}>
      {label || placeholder} {required && <span>*</span>}
    </label>
    {description && <p>{description}</p>}
    {type !== "textarea" ? (
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
        value={value}
      >
        {value}
      </textarea>
    )}
    {formik?.errors[name] && formik.touched[name] && (
      <span className="error">{formik.errors[name]}</span>
    )}
  </InputContainer>
);
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
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
  disabled: false,
};

export default Input;
