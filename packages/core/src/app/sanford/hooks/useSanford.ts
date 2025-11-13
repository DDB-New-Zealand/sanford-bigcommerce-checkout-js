import { useCheckout } from '@bigcommerce/checkout/contexts';

import { type DeliveryDate } from "../../shipping/shippingDelivery/ShippingDelivery";
import { SANFORD_CONFIG } from '../config';

export interface UpdateDeliveryOption {
    isSubscription: boolean;
    deliveryDate: string;
    frequency: string;
    cartId?: string;
    customerId: string;
}

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
            const response = await fetch(`${SANFORD_CONFIG.BASE_URL}${SANFORD_CONFIG.SHIPPING_OPTION}?cartId=${cart.id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching shipping options:', error);
            throw error;
        }
    };

    const updateDeliveryOption = async (
        data: UpdateDeliveryOption
    ) => {
        const response = await fetch(`${SANFORD_CONFIG.BASE_URL}${SANFORD_CONFIG.SHIPPING_OPTION}`, {
             method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    return { 
        fetchAvailableDates,
        updateDeliveryOption,
    };
};
