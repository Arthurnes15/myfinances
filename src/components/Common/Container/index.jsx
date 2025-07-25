import PropTypes from 'prop-types';
import { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';
import './styles.css';

function Container({ children }) {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <article
      className="container"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      {children}
    </article>
  );
}

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
