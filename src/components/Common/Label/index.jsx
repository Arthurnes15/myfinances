import PropTypes from 'prop-types';
import './styles.css';

function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

export default Label;

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};
