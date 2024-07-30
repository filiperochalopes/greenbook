import Button from "./styles";

import PropTypes from "prop-types";

const Btn = ({ children, onClick, type, className, disabled, loading }) => (
  <Button
    type={type}
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {loading ? "Carregando..." : children}
  </Button>
);

Btn.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

Btn.defaultProps = {
  type: "button",
  disabled: false,
  loading: false,
  onClick: () => { },
};

export default Btn;
