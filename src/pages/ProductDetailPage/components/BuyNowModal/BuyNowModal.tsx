import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as styles from './BuyNowModal.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { useRootStore } from '@/store/RootStoreContext';
import { OrderStore } from '@/store/OrderStore';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { OrderFormData } from '@/types/order.types';
import { IProduct } from '@/types/products.types';
import { useLocalStore } from '@/hooks/useLocalStore';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

const BuyNowModal: React.FC<BuyNowModalProps> = observer(({ isOpen, onClose, product }) => {
  const orderStore = useLocalStore(() => new OrderStore());
  const { userStore } = useRootStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      email: '',
      city: '',
      house: '',
      apartment: '',
    },
  });

  const { cartStore } = useRootStore();

  useEffect(() => {
    return () => {
      orderStore.destroy();
    };
  }, [orderStore]);
  if (!isOpen || !product) return null;

  const handleBuyNow = async (data: OrderFormData) => {
    if (!product || !product.id) {
      console.error('Product is undefined or missing id');
      return;
    }
    const addedItem = cartStore.items[0];

    const orderData = {
      ...data,
      items: [addedItem.id],
    };

    await orderStore.createOrder(orderData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {!userStore.user?.email ? (
          <>
            <p>Please login to continue</p>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </>
        ) : (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <div className={styles.content}>
              <Text tag="h2" view="title" weight="bold" className={styles.title}>
                Order Now
              </Text>
              <Text view="p-16" color="secondary" className={styles.productDetails}>
                <span>{product.title}</span>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
              </Text>

              <form onSubmit={handleSubmit(handleBuyNow)} className={styles.form}>
                <div className={styles.formGroup}>
                  <Text view="p-16" color="secondary">
                    City
                  </Text>
                  {errors.city && (
                    <Text view="p-14" color="secondary" className={styles.errorText}>
                      {errors.city.message}
                    </Text>
                  )}
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: 'City is required' }}
                    render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Text view="p-16" color="secondary">
                    House
                  </Text>
                  {errors.house && (
                    <Text view="p-14" color="secondary" className={styles.errorText}>
                      {errors.house.message}
                    </Text>
                  )}
                  <Controller
                    name="house"
                    control={control}
                    rules={{ required: 'House is required' }}
                    render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Text view="p-16" color="secondary">
                    Apartment
                  </Text>
                  {errors.apartment && (
                    <Text view="p-14" color="secondary" className={styles.errorText}>
                      {errors.apartment.message}
                    </Text>
                  )}
                  <Controller
                    name="apartment"
                    control={control}
                    rules={{ required: 'Apartment is required' }}
                    render={({ field }) => <Input value={field.value} onChange={field.onChange} />}
                  />
                </div>

                <div className={styles.summary}>
                  <div className={styles.totalItems}>
                    <Text view="p-16" color="primary">
                      Selected item: {product.title}
                    </Text>
                  </div>
                  <div className={styles.totalPrice}>
                    <Text view="p-18" weight="bold" color="primary">
                      Total: ${product.price.toFixed(2)}
                    </Text>
                  </div>
                </div>

                {orderStore.error && (
                  <div className={styles.error}>
                    <Text view="p-14" color="secondary" className={styles.errorText}>
                      {orderStore.error}
                    </Text>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={orderStore.isLoading}
                  loading={orderStore.isLoading}
                  className={styles.confirmButton}
                >
                  Confirm Order
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default BuyNowModal;
