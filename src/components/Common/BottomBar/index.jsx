import { Link } from 'react-router-dom';
import {
  BsCreditCard2Front,
  BsPersonCircle,
  BsPiggyBank,
  BsWallet,
} from 'react-icons/bs';
import clsx from 'clsx';

import './styles.css';

function Navbar() {
  return (
    <nav id="navbar">
      <div id="navbar-content">
        <ul id="nav-items">
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/spendings',
            })}
          >
            <Link to="/spendings">
              <BsWallet size={25} />
              Gastos
            </Link>
          </li>
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/invoices',
            })}
          >
            <Link to="/invoices">
              <BsCreditCard2Front size={25} />
              Fatura
            </Link>
          </li>
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/savings',
            })}
          >
            <Link to="/savings">
              <BsPiggyBank size={25} />
              Economias
            </Link>
          </li>
          <li
            className={clsx('nav-item', {
              ' active': location.pathname === '/account',
            })}
          >
            <Link to="/account">
              <BsPersonCircle size={25} />
              Conta
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
