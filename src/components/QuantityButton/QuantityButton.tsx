import React from 'react';
import { observer } from 'mobx-react-lite';
import * as styles from './QuantityButton.module.scss';
import { useQuantityButton } from './useQuantityButton';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

interface QuantityButtonProps {
  productId: number;
}

const QuantityButton: React.FC<QuantityButtonProps> = observer(({ productId }) => {
  const { quantity, handleIncrease, handleDecrease } = useQuantityButton(productId);

  return (
    <div className={styles.frame}>
      <MinusIcon onClick={handleDecrease} />
      <div className={styles.element}>{quantity}</div>
      <PlusIcon onClick={handleIncrease} />
    </div>
  );
});

QuantityButton.displayName = 'QuantityButton';
export default QuantityButton;