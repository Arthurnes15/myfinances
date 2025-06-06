import logo from '../../../assets/images/logo.png';
import './styles.css';

function HeaderMobile() {
  return (
    <header className="header-mobile">
      <img src={logo} alt="logo" />
      <h1>MyFinances</h1>
    </header>
  );
}

export default HeaderMobile;
