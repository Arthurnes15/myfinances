import { useState } from 'react';
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsBoxArrowRight,
  BsCreditCard2Front,
  BsPersonCircle,
  BsPiggyBank,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './styles.css';

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [classOpen, setClassOpen] = useState('');

  function handleOpenSidebar() {
    setClassOpen('open-sidebar');
    setOpen(false);
  }

  function handleCloseSidebar() {
    setClassOpen('');
    setOpen(true);
  }

  return (
    <>
      <nav id="sidebar" className={classOpen}>
        <div id="sidebar_content">
          <div className="header">
            <img src={logo} alt="" />
            <h1 id="title">MyFinances</h1>
          </div>
          <div id="user">
            <BsPersonCircle size={24} />
            <p id="user_infos">
              <span className="item-description">Arthur</span>
            </p>
          </div>

          <ul id="side_items">
            <li className="side-item">
              <Link to="/bills">
                <BsCreditCard2Front size={30} />
                <span className="item-description">Gastos</span>
              </Link>
            </li>
            <li className="side-item">
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

        <div id="logout">
          <button id="logout_btn">
            <BsBoxArrowRight size={20} />
            <span>Sair</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
