import PropTypes from 'prop-types';
import { BsXCircle } from 'react-icons/bs';
import Modal from 'react-modal';

import './styles.css';

Modal.setAppElement('#root');

function ModalComponent({ className, open, close, content, title, children }) {
  if (open) {
    return (
      <Modal
        className={className}
        isOpen={open}
        parentSelector={() => document.querySelector('#root')}
        onRequestClose={close}
        contentLabel={content}
        overlayClassName="modal-overlay"
      >
        <header className="header-modal">
          <h1>{title}</h1>
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
  className: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
  content: PropTypes.string,
  title: PropTypes.string,
};
