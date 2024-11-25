import React from 'react';
import { observer } from 'mobx-react-lite';
import * as styles from './QuantityButton.module.scss';
import plusSvg from '@/assets/images/plus.svg'
import minusSvg from '@/assets/images/minus.svg'
import { useQuantityButton } from './useQuantityButton';

interface QuantityButtonProps {
  productId: number;
}

const QuantityButton: React.FC<QuantityButtonProps> = observer(({ productId }) => {
  const { quantity, handleIncrease, handleDecrease } = useQuantityButton(productId);

  return (
    <div className={styles.frame}>
      <img 
        className={styles.img} 
        alt="Minus" 
        src={minusSvg}
        onClick={handleDecrease}
      />
      <div className={styles.element}>{quantity}</div>
      <img 
        className={styles.img} 
        alt="Plus" 
        src={plusSvg}
        onClick={handleIncrease}
      />
    </div>
  );
});

QuantityButton.displayName = 'QuantityButton';
export default QuantityButton;