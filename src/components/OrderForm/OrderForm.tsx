import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, Controller } from 'react-hook-form';
import { useRootStore } from '@/store/RootStoreContext';
import { OrderStore } from '@/store/OrderStore';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { OrderFormData } from '@/types/order.types';
import * as styles from './OrderForm.module.scss';
import { useLocalStore } from '@/hooks/useLocalStore';

const OrderForm: React.FC = observer(() => {
  const { cartStore, userStore } = useRootStore();
  const orderStore = useLocalStore(() => new OrderStore());
  
  const { control, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      email: userStore.user?.email || '',
      city: '',
      house: '',
      apartment: ''
    }
  });

  useEffect(() => {
    return () => {
      orderStore.destroy();
    };
  }, [orderStore]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      if (cartStore.selectedItems.length === 0) {
        throw new Error('Please select items to order');
      }

      const orderData = {
        ...data,
        cartItemIds: cartStore.selectedItems.map(item => item.id)
      };

      await orderStore.createOrder(orderData);
      
    } catch (error) {
      
      let errorMessage = 'An error occurred while creating your order';
      
      if (error instanceof Error) {
        switch (error.message) {
          case 'No items selected':
            errorMessage = 'Please select items to order';
            break;
          case 'Товары не найдены':
            errorMessage = 'Selected items are not available';
            break;
          case 'Payment form initialization failed':
            errorMessage = 'Payment system initialization failed. Please try again';
            break;
          case 'YooKassa initialization timeout':
            errorMessage = 'Payment system is temporarily unavailable. Please try again later';
            break;
          default:
            errorMessage = error.message || 'Failed to create order';
        }
      }
      
    //   orderStore.setError(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {!userStore.user && (
          <div className={styles.formGroup}>
            <Text view="p-16" color="secondary">Email</Text>
            {errors.email && (
              <div className={styles.formGroup}>
                <Text view="p-14" color="secondary">
                  {errors.email.message}
                </Text>
              </div>
            )}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="email"
                />
              )}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <Text view="p-16" color="secondary">City</Text>
          {errors.city && (
            <Text view="p-14" color="secondary" className={styles.errorText}>
              {errors.city.message}
            </Text>
          )}
          <Controller
            name="city"
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Text view="p-16" color="secondary">House</Text>
          {errors.house && (
            <Text view="p-14" color="secondary" className={styles.errorText}>
              {errors.house.message}
            </Text>
          )}
          <Controller
            name="house"
            control={control}
            rules={{ required: 'House is required' }}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Text view="p-16" color="secondary">Apartment</Text>
          {errors.apartment && (
            <Text view="p-14" color="secondary" className={styles.errorText}>
              {errors.apartment.message}
            </Text>
          )}
          <Controller
            name="apartment"
            control={control}
            rules={{ required: 'Apartment is required' }}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.summary}>
          <div className={styles.totalItems}>
            <Text view="p-16">
              Selected items: {cartStore.totalSelectedItems}
            </Text>
          </div>
          <div className={styles.totalPrice}>
            <Text view="p-18" weight="bold">
              Total: ${cartStore.totalSelectedPrice.toFixed(2)}
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
          disabled={cartStore.selectedItems.length === 0 || orderStore.isLoading}
          loading={orderStore.isLoading}
        >
          Confirm Order
        </Button>
      </form>
      <div 
        id="payment-form" 
        className={styles.paymentForm}
      />
    </>
  );
});

export default OrderForm; 