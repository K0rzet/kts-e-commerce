import React from 'react';
import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import * as styles from './PaymentPage.module.scss';
import PaymentForm from '@/components/PaymentForm/PaymentForm';

const PaymentPage: React.FC = observer(() => {
  return (
    <div className={styles.paymentPage}>
      <Text tag="h1" view="title" weight="bold">
        Payment
      </Text>
      <PaymentForm />
    </div>
  );
});

export default PaymentPage; 