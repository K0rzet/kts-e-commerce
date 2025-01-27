import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import * as styles from './OrderPage.module.scss';
import { useMeta } from '@/context/MetaContext';
import OrderForm from './components/OrderForm';

const OrderPage: React.FC = observer(() => {
  const { setTitle } = useMeta();
  useEffect(() => {
    setTitle('Order Placement');
  }, [setTitle]);
  return (
    <div className={styles.orderPage}>
      <Text tag="h1" view="title" weight="bold">
        Order Placement
      </Text>
      <OrderForm />
    </div>
  );
});

export default OrderPage;
