import { type Cart } from '@bigcommerce/checkout-sdk';

import { type CheckoutContextProps } from '@bigcommerce/checkout/contexts';

import { withCheckout } from '../../checkout';
import { SANFORD_CONFIG } from '../../sanford/config';
import getShippingMethodId from '../getShippingMethodId';

import ShippingDeliveryForm from './ShippingDeliveryForm';

// export interface ShippingDeliveryProps {
//     isInitialValueLoaded: boolean;
//     isMultiShippingMode: boolean;
//     isUpdatingAddress?: boolean;
//     shouldShowShippingOptions: boolean;
//     shippingFormRenderTimestamp?: number;
// }

export interface WithCheckoutShippingDeliveryProps {
    cart: Cart;
    // isSubscription: boolean
    methodId: string | undefined;
}

export interface DeliveryDate {
    date: string;
    description: string;
}

export interface ShippingDeliveryProps {
    isInitialValueLoaded: boolean;
    isMultiShippingMode: boolean;
    isUpdatingAddress?: boolean;
    shouldShowShippingOptions: boolean;
    shippingFormRenderTimestamp?: number;
}

// const getPurchaseType = (cart: Cart): boolean => {
//     return cart.lineItems.physicalItems.some(item =>
//         item.options?.some(option => option.valueId === SANFORD_CONFIG.SUBSCRIPTION_VARIANT_ID)
//     );
// }

export function mapToShippingDelivery(
    { checkoutState }: CheckoutContextProps,
): WithCheckoutShippingDeliveryProps | null {
    const {
        data: { getCart, getConfig, getCustomer, getCheckout },
    } = checkoutState;
    
    const customer = getCustomer();
    const cart = getCart();
    const config = getConfig();
    const checkout = getCheckout();
    
    
    if (!config || !checkout || !customer || !cart) {
        return null;
    }
    
    // const isSubscription = getPurchaseType(cart);
    const methodId = getShippingMethodId(checkout, config);
    
    return {
        cart,
        methodId,
    };
}

export default withCheckout(mapToShippingDelivery)(ShippingDeliveryForm);
