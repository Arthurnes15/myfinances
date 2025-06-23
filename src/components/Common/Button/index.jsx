import PropTypes from 'prop-types';

import './styles.css';

function Button({ type, className, style, children, onClick }) {
  return (
    <button type={type} className={className} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
