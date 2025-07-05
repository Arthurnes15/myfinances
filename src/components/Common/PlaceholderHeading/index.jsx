import PropTypes from 'prop-types';
import { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';
import './styles.css';

function PlaceholderHeading({ text }) {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <div className="placeholder-heading">
      <h1 style={{ color: theme.textColorSecondary }}>{text}</h1>
    </div>
  );
}

PlaceholderHeading.propTypes = {
  text: PropTypes.string,
};

export default PlaceholderHeading;
