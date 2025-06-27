import PropTypes from 'prop-types';
import { BsXCircle } from 'react-icons/bs';
import Modal from 'react-modal';

import './styles.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';

Modal.setAppElement('#root');

function ModalComponent({
  id,
  className,
  open,
  close,
  content,
  title,
  children,
}) {
  const [{ theme }] = useContext(ThemeContext);

  if (open) {
    return (
      <Modal
        id={id}
        className={className}
        style={{ content: { backgroundColor: theme.backgroundColor } }}
        isOpen={open}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={close}
        contentLabel={content}
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        //TODO: Mais propriedades de acessibilidade
      >
        <header className="header-modal">
          <h1 style={{ color: theme.textColor }}>{title}</h1>
          <button type="button" onClick={close} className="close-modal">
            <BsXCircle size={40} color="red" />
          </button>
        </header>

        {children}
      </Modal>
    );
  } else {
    return <></>;
  }
}

export default ModalComponent;

ModalComponent.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
  content: PropTypes.string,
  title: PropTypes.string,
};
