import { useContext } from 'react';

import { ThemeContext } from '../../../contexts/ThemeContext';
import logo from '../../../assets/images/logo.png';
import ToggleTheme from '../../ToggleTheme';
import './styles.css';

function HeaderMobile() {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <header className="header-mobile">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1 style={{ color: theme.textColorSecondary }}>MyFinances</h1>
      </div>
      <div className="toggle-theme">
        <ToggleTheme />
      </div>
    </header>
  );
}

export default HeaderMobile;
