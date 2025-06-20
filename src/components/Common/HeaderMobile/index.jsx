import logo from '../../../assets/images/logo.png';
import ToggleTheme from '../../ToggleTheme';
import './styles.css';

function HeaderMobile() {
  return (
    <header className="header-mobile">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>MyFinances</h1>
      </div>
      <div className="toggle-theme">
        <ToggleTheme />
      </div>
    </header>
  );
}

export default HeaderMobile;
