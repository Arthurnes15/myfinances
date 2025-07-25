import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import logo from '../../../assets/images/logo.png';
import './styles.css';

function HeaderInitial() {
  const [{ theme }] = useContext(ThemeContext);

  return (
    <header className="title">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="text">
        <h1 style={{ color: theme.textColorSecondary }}>MyFinances</h1>
      </div>
    </header>
  );
}

export default HeaderInitial;
