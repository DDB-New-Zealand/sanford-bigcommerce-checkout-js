import { useCheckout } from '@bigcommerce/checkout/contexts';

import { type DeliveryDate } from "../../shipping/shippingDelivery/ShippingDelivery";

export const useSanford = () => {
    const { checkoutState } = useCheckout();
    
    const {
        data: {
            getCart,
            getCheckout,
        },
    } = checkoutState;

    const cart = getCart();
    const checkout = getCheckout();

    if (!checkout || !cart) {
        throw new Error('Unable to access checkout data');
    }


    const fetchAvailableDates = async (): Promise<{
        result: {
            isSubscription: boolean;
            selectedDate: string;
            selectedFrequency: string;
            dates: DeliveryDate[];
        }
    }> => {
        try {
            const response = await fetch(`https://staging-sanford-and-sons.vercel.app/api/bc-checkout/shipping-options?cartId=${cart.id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch shipping options');
            }

            return data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching shipping options:', error);
            throw error;
        }
    };

    return { fetchAvailableDates };
};
