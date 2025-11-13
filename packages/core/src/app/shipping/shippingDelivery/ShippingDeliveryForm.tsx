import { type FormikProps } from 'formik';
import { noop } from 'lodash';
import React, { type ReactElement, useEffect, useState } from 'react';

import { withFormikExtended } from '../../common/form';
import { useSanford } from '../../sanford/hooks/useSanford';
import { getShippingDeliveryIds } from '../utils/getShippingDeliveryIds';

import { NoShippingDelivery } from './NoShippingDelivery';
import { type DeliveryDate, type ShippingDeliveryProps, type WithCheckoutShippingDeliveryProps } from './ShippingDelivery';
import './ShippingDeliveryForm.scss';
import ShippingDate from './ShippingDeliveryDates';
import ShippingFrequency from './ShippingDeliveryFrequency';

export type ShippingDeliveryFormProps = ShippingDeliveryProps &
    WithCheckoutShippingDeliveryProps;

export interface ShippingDeliveryFormValues {
    shippingDeOptionIds: {
        [shippingOptionIds: string]: string;
    };
}

const ShippingDeliveryForm = (props: ShippingDeliveryFormProps & FormikProps<ShippingDeliveryFormValues>): ReactElement => {
    const { fetchAvailableDates, updateDeliveryOption } = useSanford();
    const [ availableDates, setAvailableDates ] = useState<DeliveryDate[]>([]);
    const [isFetchingDates, setIsFetchingDates] = useState<boolean>(false);
    const [isSubscription, setIsSubscription] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
    
    const {
        cart,
    } = props;
    // const { analyticsTracker } = useAnalytics();

    // const selectDefaultShippingOptions = async ({ data }: CheckoutSelectors) => {
    //     const consignment = (data.getConsignments() || []).find(
    //         ({ selectedShippingOption, availableShippingOptions: shippingOptions }) =>
    //             !selectedShippingOption && shippingOptions,
    //     );

    //     if (!consignment || !consignment.availableShippingOptions) {
    //         return;
    //     }

    //     const { availableShippingOptions, id } = consignment;
    //     const recommendedOption = getRecommendedShippingOption(availableShippingOptions);
    //     const singleShippingOption =
    //         availableShippingOptions.length === 1 && availableShippingOptions[0];
    //     const defaultShippingOption = recommendedOption || singleShippingOption;

    //     if (!defaultShippingOption) {
    //         return;
    //     }

    //     await selectShippingOption(id, defaultShippingOption.id);
    //     setFieldValue(`shippingOptionIds.${id}`, defaultShippingOption.id);
    // }

    useEffect(() => {
        setIsFetchingDates(true);

        fetchAvailableDates().then((response) => {
            console.debug('Fetched available dates:', response);

            const { result: { isSubscription: subscription, selectedDate, selectedFrequency, dates } } = response;
            
            setAvailableDates(dates);
            setSelectedDate(selectedDate || dates[0]?.date || null);
            setSelectedFrequency(selectedFrequency);
            setIsSubscription(subscription);
        }).finally(() => {
            setIsFetchingDates(false);
        });    
    }, []);

    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
        
        console.debug('Selected date:', {
            isSubscription,
            deliveryDate: date,
            frequency: selectedFrequency || '',
            cartId: cart.id,
            customerId: String(cart.customerId),
        });

        updateDeliveryOption({
            isSubscription,
            deliveryDate: date,
            frequency: selectedFrequency || '',
            cartId: cart.id,
            customerId: String(cart.customerId),
        }).then(() => {
            console.debug('Updated delivery option with date:', date);
        }).catch((error) => {
            console.error('Error updating delivery option:', error);
        });

    }

    // useEffect(() => {
    //     if (consignments?.length && shouldShowShippingOptions) {
    //         analyticsTracker.showShippingMethods();
    //     }
    // }, [consignments, shouldShowShippingOptions]);

    // useEffect(() => {
    //     if(shippingFormRenderTimestamp){
    //         setValues(getShippingOptionIds(props));
    //     }
    // }, [shippingFormRenderTimestamp]);

    return (
        <>
            {
            isFetchingDates ? <NoShippingDelivery isLoading={isFetchingDates} message="Loading available dates..." />
            : <>
                <ShippingDate dates={availableDates} handleSelectDate={handleSelectDate} selectedDate={selectedDate} />
                {isSubscription ? <ShippingFrequency /> : null}
            </>
        }
            
            
        </>
    );
};

export default withFormikExtended<ShippingDeliveryFormProps, ShippingDeliveryFormValues>({
    handleSubmit: noop,
})(ShippingDeliveryForm);
