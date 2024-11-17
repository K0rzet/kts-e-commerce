import React from 'react';
import * as styles from './ProductCard.module.scss';
import Text from '@/components/Text';
import classNames from 'classnames';
import { ICategory } from '@/types/category.types';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  images: string[];
  /** Слот над заголовком */
  category?: ICategory;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  description: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  price?: string | number;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const ProductCard: React.FC<CardProps> = React.memo(({
  className,
  images,
  title,
  description,
  category,
  price,
  actionSlot,
  onClick,
}) => {
  return (
    <div
      className={classNames(styles.productCard, className)}
      onClick={onClick}
      data-testid="productCard"
    >
      <div className={styles.imageWrapper}>
        <img
          src={images[0]}
          alt=""
          className={styles.image}
          data-testid="productCard-image"
          draggable={false}
        />
      </div>
      <div className={styles.content}>
        {category && (
          <Text
            view="p-14"
            weight="medium"
            color="secondary"
            maxLines={1}
            tag="div"
          >
            {category.name}
          </Text>
        )}
        {
          <Text
            view="p-20"
            weight="bold"
            maxLines={2}
            tag="div"
          >
            {title}
          </Text>
        }
        {
          <Text
            view="p-16"
            color="secondary"
            maxLines={3}
            tag="div"
          >
            {description}
          </Text>
        }
      </div>
      <div className={styles.footer}>
        {price && (
          <Text
            view="p-18"
              weight="bold"
              color="primary"
              tag="div"
              className={styles.contentText}
            >
              {price}$
          </Text>
        )}
        {actionSlot && <div className={styles.action}>{actionSlot}</div>}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
