import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, header, onClose }) => {
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} p-10`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className="text text_type_main-large">{header}</div>
          <div className={styles.closeIcon}>
            <CloseIcon onClick={onClose} type="primary" />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
