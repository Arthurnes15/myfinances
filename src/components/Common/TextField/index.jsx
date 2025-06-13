import PropTypes from 'prop-types';

import './styles.css';

function TextField({ children, errors }) {
  return (
    <div className="text-field">
      {children}
      <span className="text-danger">{errors}</span>
    </div>
  );
}

export default TextField;

TextField.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.string,
};
