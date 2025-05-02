import { Link } from 'react-router-dom';
import {
  BsBoxArrowRight,
  BsCreditCard2Front,
  BsPersonCircle,
  BsPiggyBank,
  BsWallet,
} from 'react-icons/bs';
import clsx from 'clsx';

import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/images/logo.png';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user.username);

  function handleLogout() {
    dispatch(actions.loginFailure());
  }

  return (
    <nav id="navbar">
      <div id="navbar-content">
        <div className="header">
          <img src={logo} alt="" />
          <p className="user">
            <BsPersonCircle size={24} />
            {user}
          </p>
        </div>
        <ul id="nav-items">
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/spendings',
            })}
          >
            <Link to="/spendings">
              <BsWallet size={30} />
            </Link>
          </li>
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/invoices',
            })}
          >
            <Link to="/invoices">
              <BsCreditCard2Front size={30} />
            </Link>
          </li>
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/savings',
            })}
          >
            <Link to="/savings">
              <BsPiggyBank size={30} />
            </Link>
          </li>

          <button id="logout_btn" onClick={handleLogout}>
            <BsBoxArrowRight size={20} />
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
