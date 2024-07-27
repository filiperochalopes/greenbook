import Container from "./styles";

import PropTypes from "prop-types";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import CreatableSelect from "react-select/creatable";

const selectStyles = {
  container: (props) => ({
    ...props,
    height: "2.2rem",
  }),
  indicatorSeparator: () => ({
    border: "none",
  }),
  indicatorContainer: () => ({
    border: "2px",
    height: "21px",
    svg: {
      fill: "#000",
    },
  }),
  control: (props, { isDisabled }) => ({
    ...props,
    background: "#f0f0f0",
    borderWidth: "1px",
    borderColor: "green",
    borderRadius: "5px",
    minHeight: "2rem",
    height: "2rem",
    opacity: isDisabled ? "0.4" : "1",
  }),
  placeholder: (props) => ({
    ...props,
    color: "#000",
    fontSize: "0.9rem",
    height: "21px",
  }),
};

const Select = ({
  formik,
  name,
  label,
  description,
  placeholder,
  required,
  creatable,
  async,
  options,
  onBlur,
  onChange,
  isMulti,
  isOptionDisabled,
  onCreateOption,
  disabled,
  menuIsOpen,
  components,
}) => {
  const SelectComponent =
    creatable && !async
      ? CreatableSelect
      : async && creatable
      ? AsyncCreatableSelect
      : async
      ? AsyncSelect
      : ReactSelect;

  return (
    <Container>
      <label to={name}>
        {label || placeholder} {required && <span>*</span>}
      </label>
      {description && <p>{description}</p>}
      <SelectComponent
        menuPosition="fixed"
        placeholder={
          isMulti ? "Selecione uma ou mais opções" : "Selecione uma opção"
        }
        styles={selectStyles}
        id={name}
        name={name}
        options={!async && options}
        loadOptions={async && options}
        cacheOptions={async && true}
        components={components}
        defaultOptions={async && true}
        formatCreateLabel={(inputValue) =>
          `Clique para Adicionar "${inputValue}"`
        }
        onCreateOption={
          onCreateOption &&
          creatable &&
          ((value) => {
            onCreateOption(value);
            // Verifica se o input aceita varias respostas ou apenas uma para setar o campo da melhor forma
            if (isMulti) {
              if (Array.isArray(formik.values[name])) {
                formik.setFieldValue(name, [...formik.values[name], value]);
              } else {
                formik.setFieldValue(name, [value]);
              }
            } else {
              formik.setFieldValue(name, value);
            }
            formik.setFieldTouched(name, true, true);
          })
        }
        value={formik.values[name]}
        onChange={(e) => {
          if (onChange) onChange(e);
          if(Array.isArray(e)) {
            // caso seja uma lista é porque pode várias opções
            // caso o último elemento do array tenha o value como string transformar em objeto
            if(e[e.length - 1].value) e[e.length - 1] = {...e[e.length - 1], value: {name: e[e.length - 1].value}};
            formik.setFieldValue(name, e.reduce((acc, curr) => [...acc, curr ], []));
          }else{
            // Apenas uma opção, ou seja, isMulti é falso
            formik.setFieldValue(name, e);
          }
          formik.setFieldTouched(name, true, true);
        }}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
        }}
        isMulti={isMulti}
        isOptionDisabled={isOptionDisabled}
        isDisabled={disabled}
        menuIsOpen={menuIsOpen || undefined}
      />
      {formik?.errors[name] &&
        (formik.touched[name] || formik.submitCount > 0) && (
          <span className="error">{formik.errors[name]}</span>
        )}
    </Container>
  );
};

Select.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  creatable: PropTypes.bool,
  async: PropTypes.bool,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  isOptionDisabled: PropTypes.func,
  onCreateOption: PropTypes.func,
  description: PropTypes.string || PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  components: PropTypes.object
};

Select.defaultProps = {
  placeholder: "Selecione um item",
  required: false,
  creatable: false,
  isMulti: false,
  async: false,
  disabled: false,
  menuIsOpen: false,
  components: {},
  options: [],
};

export default Select;
