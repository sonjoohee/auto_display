import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PagePayTest = () => {
  const [message, setMessage] = useState('');

  const handleApprove = (data, actions, amount) => {
    return actions.order.capture().then(function(details) {
      setMessage(`${amount} 결제가 완료되었습니다.`);
    }).catch(error => {
      setMessage(`결제 실패: ${error.message}`);
    });
  };

  const createOrder = (amount) => {
    return (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount.toString(),
          },
        }],
      });
    };
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>PayPal 결제 테스트</h2>
      <h2>Visa: 4111 1111 1111 1111</h2>
      <h2>MasterCard: 5555 5555 5555 4444</h2>
      <h2>American Express: 3782 822463 10005</h2>
      <h2>Discover: 6011 1111 1111 1117</h2>

      <div>
        <h3>100$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(100)}
            onApprove={(data, actions) => handleApprove(data, actions, 100)}
          />
        </div>
      </div>
      <div>
        <h3>1000$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(1000)}
            onApprove={(data, actions) => handleApprove(data, actions, 1000)}
          />
        </div>
      </div>
      <div>
        <h3>10000$ 결제</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <PayPalButtons
            createOrder={createOrder(10000)}
            onApprove={(data, actions) => handleApprove(data, actions, 10000)}
          />
        </div>
      </div>
      {message && <div style={{ marginTop: '20px', fontSize: '18px' }}>{message}</div>}
    </div>
  );
};

export default PagePayTest;
