import PropTypes from 'prop-types';
import { BsPlus } from 'react-icons/bs';

import Button from '../Button';
import './styles.css';

function Header({ icon, title, onClick }) {
  return (
    <header className="header-pages">
      {icon}
      <h1>{title}</h1>
      <div>
        <Button className="insert" type="button" onClick={onClick}>
          <BsPlus size={30} color="white" />
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
