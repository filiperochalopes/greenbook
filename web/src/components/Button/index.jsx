import Button from "./styles";

import PropTypes from "prop-types";

const Btn = ({ children, onClick, type, className, disabled }) => (
  <Button
    type={type}
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {children}
  </Button>
);

Btn.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Btn.defaultProps = {
  type: "button",
  disabled: false,
  onClick: () => {},
};

export default Btn;
