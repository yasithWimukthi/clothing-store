import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IxBFQD6wxpllAmN0Ad6MVWGfvgi59IxpknnvtL618yxLJZMHy8SJH3eiNleNmMOWV4ArdhwDrb3LcEObrf5Rx4D00yUdSJ08M' ;
    
    const onToken = token =>{
        console.log(token);
        alert('Payment is successful');
    }

    return(
        <StripeCheckout
            label="Pay Now"
            name="crown clothing Ltd."
            billingAddress
            shippingAddress
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
