import PropTypes from 'prop-types';

import Modal from '../Modal';
import DoneIcon from './DoneIcon.svg';

const OrderDetails = ({ onClose }) => {
    const count = Math.floor(Math.random() * 3)

    return (
        <Modal onClose={onClose}>
            <>
                <div className="text text_type_digits-large mt-5 mb-8">034536</div>
                <div className="text text_type_main-default">Идентификатор заказа</div>
                <div className="text text_type_main-default mt-15 mb-15"><img src={DoneIcon} /></div>
                <div className="text text_type_main-small">Ваш заказ начали готовить</div>
                <div className="text text_type_main-small text_color_inactive mt-2 mb-5">Дождитесь готовности на орбитальной станции</div>
            </>
        </Modal>
    )
};

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default OrderDetails
