import PropTypes from 'prop-types';
import './styles.css';

function Container({ children }) {
  return <section className="container">{children}</section>;
}

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
