import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/Text';
import * as styles from './PaymentForm.module.scss';

interface PaymentFormProps {
  token?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = observer(({ token }) => {
  const navigate = useNavigate();
  const [isPaymentFormLoading, setIsPaymentFormLoading] = useState(true);
  const [isLoadedScript, setIsLoadedScript] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.yoomoney.ru/checkout-client/checkout-widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsLoadedScript(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoadedScript || !token) return;

    const checkout = new window.YooKassa({
      confirmation_token: token,
      return_url: `${window.location.origin}/thanks`,
      success_callback: () => {
        navigate('/thanks');
      },
      embedded: true,
      modal: false,
      newDesign: true
    });

    setIsPaymentFormLoading(false);
    checkout.render('payment-form');
  }, [isLoadedScript, token, navigate]);

  return (
    <div className={styles.paymentFormContainer}>
      {isPaymentFormLoading && (
        <div className={styles.loading}>
          <Text view="p-16">Loading payment form...</Text>
        </div>
      )}
      <div 
        id="payment-form" 
        className={styles.paymentForm}
      />
    </div>
  );
});

export default PaymentForm; 