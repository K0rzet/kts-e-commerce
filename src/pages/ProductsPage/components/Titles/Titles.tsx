import React from 'react';
import * as styles from './Titles.module.scss';
import Text from '@/components/Text';
const Titles = () => {
  return (
    <div className={styles.container}>
      <Text tag="h1" view="title" weight="bold">
        Products
      </Text>
      <Text tag="h2" view="p-20" weight="normal" color="secondary">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
    </div>
  );
};

export default Titles;
