import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

import './styles.css';

function Label({ htmlFor, children }) {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <label htmlFor={htmlFor} style={{ color: theme.textColor }}>
      {children}
    </label>
  );
}

export default Label;

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};
