import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectOrderOptions } from '../../store/order/orderSlice';

import Modal from '../Modal';
import DoneIcon from './DoneIcon.svg';

import styles from './OrderDetails.module.css';

type TOrderDetailsProps = {
  onClose: () => void;
};

const OrderDetails: FC<TOrderDetailsProps> = ({ onClose }) => {
  const { order, orderLoading } = useSelector(selectOrderOptions);
  return (
    <Modal onClose={onClose}>
      <div className={styles.orderContainer}>
        {!orderLoading && order && (
          <>
            <div className="text text_type_digits-large mt-5 mb-8">{order.order.number}</div>
            <div className="text text_type_main-default">Идентификатор заказа</div>
            <div className="text text_type_main-default mt-15 mb-15">
              <img src={DoneIcon} alt="Заказ оформлен" />
            </div>
            <div className="text text_type_main-small">Ваш заказ начали готовить</div>
            <div className="text text_type_main-small text_color_inactive mt-2 mb-5">
              Дождитесь готовности на орбитальной станции
            </div>
          </>
        )}
        {orderLoading && (
          <>
            <div className="text text_type_main-large text_color_inactive pt-20">Загрузка...</div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OrderDetails;
