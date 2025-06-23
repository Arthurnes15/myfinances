import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BsPlus } from 'react-icons/bs';

import { ThemeContext } from '../../../contexts/ThemeContext';
import Button from '../Button';
import './styles.css';

function Header({ icon, title, onClick }) {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <header className="header-pages">
      {icon}
      <h1 style={{ color: theme.textColorSecondary }}>{title}</h1>
      <div>
        <Button
          className="insert"
          style={{
            backgroundColor: theme.backgroundColor,
            border: `1px solid ${theme.textColorSecondary}`,
          }}
          type="button"
          onClick={onClick}
        >
          <BsPlus size={30} color={theme.textColorSecondary} />
        </Button>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  onClick: PropTypes.func,
};
