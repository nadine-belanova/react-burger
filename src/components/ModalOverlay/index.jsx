import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ children, onClose }) => {
    return <div className={styles.overlay} onClick={onClose}>{children}</div>
}

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func,
};

export default ModalOverlay