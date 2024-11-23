import React from 'react';
import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import * as styles from './ThanksPage.module.scss';

const ThanksPage: React.FC = observer(() => {
  return (
    <div className={styles.thanksPage}>
      <Text tag="h1" view="title" weight="bold">
        Thank you for your payment!
      </Text>
      <Text view="p-16">
        Your order has been successfully processed.
      </Text>
    </div>
  );
});

export default ThanksPage; 