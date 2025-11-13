import classNames from 'classnames';
import React, { type FC, type ReactNode, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useCheckout, useThemeContext } from '@bigcommerce/checkout/contexts';

export interface OrderSummaryDeliveryProps {
    children?: ReactNode;
    className?: string;
    testId?: string;
}

export interface OrderSummaryDeliveryState {
    isLoading: boolean;
    isSubscription: boolean;
    selectedDate: string;
    selectedFrequency: string;
    error?: string;
}

const OrderSummaryDelivery: FC<OrderSummaryDeliveryProps> = ({
    children,
    className,
    testId,
}) => {
    const [deliveryState, setDeliveryState] = useState<OrderSummaryDeliveryState>({
        isLoading: true,
        isSubscription: false,
        selectedDate: '',
        selectedFrequency: '',
    });
    
    const {
        checkoutState: {
            data: { getCart }
        }
    } = useCheckout();
    
    const { themeV2 } = useThemeContext();
    const cart = getCart();

    // Check if cart has subscription items
    const hasSubscriptionItems = cart?.lineItems.physicalItems.some(item =>
        item.options?.some(option => option.valueId === 99) // value: "Subscription"
    ) ?? false;

    useEffect(() => {
        const loadDeliveryInfo = async () => {
            if (!hasSubscriptionItems) {
                setDeliveryState(prev => ({ 
                    ...prev, 
                    isLoading: false, 
                    isSubscription: false 
                }));

                return;
            }

            try {
                setDeliveryState(prev => ({ ...prev, isLoading: true }));
                
                // For now, using mock data - replace with actual API call when ready
                // const data = await fetchAvailableDates();
                
                // Mock data for testing
                const mockData = {
                    result: {
                        isSubscription: true,
                        selectedDate: 'November 14th, 2025',
                        selectedFrequency: 'Every 2 weeks',
                        dates: []
                    }
                };

                setDeliveryState({
                    isLoading: false,
                    isSubscription: mockData.result.isSubscription,
                    selectedDate: mockData.result.selectedDate,
                    selectedFrequency: mockData.result.selectedFrequency,
                });
                
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to load delivery info:', error);
                setDeliveryState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Failed to load delivery information'
                }));
            }
        };

        loadDeliveryInfo();
    }, [hasSubscriptionItems, cart?.id]);

    // Don't render anything if not a subscription or still loading
    if (deliveryState.isLoading || !deliveryState.isSubscription) {
        return null;
    }

    return (
        <div data-test={testId}>
            <CSSTransition
                classNames="changeHighlight"
                in={true}
                timeout={{}}
            >
                <div className={classNames(
                    'optimizedCheckout-contentPrimary',
                    className,
                )}>
                    {/* Delivery Date Section */}
                    <div className={classNames(
                        'cart-delivery-info',
                        'cart-priceItem',
                        'optimizedCheckout-contentPrimary'
                    )}>
                        <span className={classNames(
                            'cart-priceItem-label',
                            {
                                'body-regular': themeV2,
                            }
                        )}>
                            <span data-test="cart-delivery-date-label">
                                Delivery Date
                            </span>
                        </span>
                        <span className={classNames(
                            'cart-priceItem-value',
                            {
                                'body-medium': themeV2,
                            }
                        )}>
                            <span data-test="cart-delivery-date-value">
                                {deliveryState.selectedDate || 'Not selected'}
                            </span>
                        </span>
                    </div>

                    {/* Delivery Frequency Section */}
                    <div className={classNames(
                        'cart-delivery-info',
                        'cart-priceItem',
                        'optimizedCheckout-contentPrimary'
                    )}>
                        <span className={classNames(
                            'cart-priceItem-label',
                            {
                                'body-regular': themeV2,
                            }
                        )}>
                            <span data-test="cart-delivery-frequency-label">
                                Subscription Frequency
                            </span>
                        </span>
                        <span className={classNames(
                            'cart-priceItem-value',
                            {
                                'body-medium': themeV2,
                            }
                        )}>
                            <span data-test="cart-delivery-frequency-value">
                                {deliveryState.selectedFrequency || 'Not selected'}
                            </span>
                        </span>
                    </div>

                    {deliveryState.error && (
                        <div className="cart-delivery-error">
                            <span className="cart-priceItem-label cart-priceItem-label--error">
                                {deliveryState.error}
                            </span>
                        </div>
                    )}

                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

export default OrderSummaryDelivery;
