import PropTypes from 'prop-types';
import { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';
import './styles.css';

function Content({ children }) {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <section
      className="content"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {children}
    </section>
  );
}

export default Content;

Content.propTypes = {
  children: PropTypes.node,
};
