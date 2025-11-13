import { type Cart, type CheckoutSelectors } from '@bigcommerce/checkout-sdk';
import { createSelector } from 'reselect';

import { type CheckoutContextProps } from '@bigcommerce/checkout/contexts';

import { withCheckout } from '../../checkout';
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
    isSubscription: boolean
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

export const isLoadingSelector = createSelector(
    (_: CheckoutSelectors, isUpdatingAddress?: boolean) => isUpdatingAddress,
    ({ statuses }: CheckoutSelectors) => statuses.isLoadingShippingOptions,
    ({ statuses }: CheckoutSelectors) => statuses.isSelectingShippingOption,
    ({ statuses }: CheckoutSelectors) => statuses.isUpdatingConsignment,
    ({ statuses }: CheckoutSelectors) => statuses.isCreatingConsignments,
    (
        isUpdatingAddress,
        isLoadingShippingOptions,
        isSelectingShippingOption,
        isUpdatingConsignment,
        isCreatingConsignments,
    ) => {
        return (consignmentId?: string) => {
            return (
                isUpdatingAddress ||
                isLoadingShippingOptions() ||
                isSelectingShippingOption(consignmentId) ||
                isUpdatingConsignment(consignmentId) ||
                isCreatingConsignments()
            );
        };
    },
);


// Check for cart's lineItems->physicalItems[]->options[]->valueId === 99 (value: "Subscription")
const getPurchaseType = (cart: Cart): boolean => {
    return cart.lineItems.physicalItems.some(item =>
        item.options?.some(option => option.valueId === 99)
    );
}

export function mapToShippingDelivery(
    { checkoutState }: CheckoutContextProps,
    // props: ShippingDeliveryProps,
): WithCheckoutShippingDeliveryProps | null {
    const {
        data: { getCart, getConfig, getCustomer, getCheckout },
        statuses,
    } = checkoutState;
    
    const customer = getCustomer();
    const cart = getCart();
    const config = getConfig();
    const checkout = getCheckout();
    
    
    if (!config || !checkout || !customer || !cart) {
        return null;
    }
    
    const isSubscription = getPurchaseType(cart);
    const methodId = getShippingMethodId(checkout, config);
    
    return {
        cart,
        isSubscription,
        methodId,
    };
}

export default withCheckout(mapToShippingDelivery)(ShippingDeliveryForm);
