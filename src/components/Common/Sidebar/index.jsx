import { useContext, useState } from 'react';
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsBoxArrowRight,
  BsCreditCard2Front,
  BsPersonCircle,
  BsPiggyBank,
  BsWallet,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { ThemeContext } from '../../../contexts/ThemeContext';
import * as actions from '../../../store/modules/auth/actions';
import ToggleTheme from '../../ToggleTheme';
import logo from '../../../assets/images/logo.png';
import './styles.css';

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [classOpen, setClassOpen] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user.username);

  const [{ theme, isDark }] = useContext(ThemeContext);

  function handleOpenSidebar() {
    setClassOpen('open-sidebar');
    setOpen(false);
  }

  function handleCloseSidebar() {
    setClassOpen('');
    setOpen(true);
  }

  function handleLogout() {
    dispatch(actions.loginFailure());
  }

  return (
    <>
      <nav
        id="sidebar"
        className={classOpen}
        style={{
          backgroundColor: theme.backgroundColor,
          borderRight: `1px solid ${theme.textColorSecondary}`,
          color: theme.textColorSecondary,
        }}
      >
        <div id="sidebar_content">
          <div className="header">
            <div className="logo">
              <img src={logo} alt="" />
              <h1 id="title">MyFinances</h1>
            </div>
            <ToggleTheme />
          </div>
          <div id="user">
            <div style={{ backgroundColor: theme.backgroundColorSecondary }}>
              <Link to="/account" style={{ color: theme.textColorSecondary }}>
                <BsPersonCircle size={20} />
                <p id="user_info">
                  <span className="item-description">{user}</span>
                </p>
              </Link>
            </div>
          </div>

          <ul id="side_items">
            <li
              className={clsx('side-item', {
                ' dark': isDark,
                ' active': location.pathname === '/spendings',
              })}
            >
              <Link to="/spendings">
                <BsWallet size={30} />
                <span className="item-description">Gastos</span>
              </Link>
            </li>
            <li
              className={clsx('side-item', {
                ' dark': isDark,
                ' active': location.pathname === '/invoices',
              })}
            >
              <Link to="/invoices">
                <BsCreditCard2Front size={30} />
                <span className="item-description">Fatura</span>
              </Link>
            </li>
            <li
              className={clsx('side-item', {
                ' dark': isDark,
                ' active': location.pathname === '/savings',
              })}
            >
              <Link to="/savings">
                <BsPiggyBank size={30} />
                <span className="item-description">Economias</span>
              </Link>
            </li>
          </ul>
          <button
            id="open_btn"
            style={{ display: open ? 'block' : 'none' }}
            onClick={handleOpenSidebar}
          >
            <BsArrowRightCircle size={30} />
          </button>
          <button
            id="open_btn"
            style={{ display: open ? 'none' : 'block' }}
            onClick={handleCloseSidebar}
          >
            <BsArrowLeftCircle size={30} />
          </button>
        </div>

        <div id="logout" style={{ borderTop: `1px solid ${theme.textColor}` }}>
          <button id="logout_btn" onClick={handleLogout}>
            <BsBoxArrowRight size={30} />
            <span className="item-description">Sair</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
