import React, { useState } from 'react';

const SubscriptionsPage: React.FC = () => {
  const [planId, setPlanId] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [cardTokenId, setCardTokenId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const tenantId = 'mock-tenant-id'; // Mock tenant ID

    try {
      const response = await fetch(`/tenants/${tenantId}/assinaturas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          payer_email: payerEmail,
          card_token_id: cardTokenId,
        }),
      });

      if (response.ok) {
        // Handle successful subscription creation
        console.log('Subscription created successfully!');
      } else {
        // Handle error
        console.error('Failed to create subscription');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <div>
      <h1>Create Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="planId">Plan ID:</label>
          <input
            type="text"
            id="planId"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="payerEmail">Payer Email:</label>
          <input
            type="email"
            id="payerEmail"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cardTokenId">Card Token ID:</label>
          <input
            type="text"
            id="cardTokenId"
            value={cardTokenId}
            onChange={(e) => setCardTokenId(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SubscriptionsPage;
