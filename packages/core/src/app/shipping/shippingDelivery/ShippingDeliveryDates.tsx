import classNames from 'classnames';
import React, { type FunctionComponent, useState } from 'react';

import { useThemeContext } from '@bigcommerce/checkout/contexts';
import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { DropdownTrigger, Fieldset, Legend } from '@bigcommerce/checkout/ui';

import { type DeliveryDate } from './ShippingDelivery';


export interface WithCheckoutShippingOptionsProps {
    availableDates: any[];
    // invalidShippingMessage: string;
    // methodId?: string;
    // consignments?: Consignment[];
    // cart: Cart;
    // isSelectingShippingOption(consignmentId?: string): boolean;
    // subscribeToConsignments(subscriber: (state: CheckoutSelectors) => void): () => void;
    // selectShippingOption(consignmentId: string, optionId: string): Promise<CheckoutSelectors>;
    // isLoading(consignmentId?: string): boolean;
}

const DateSelectButton: FunctionComponent<{selectedDate: string | null}> = ({ selectedDate }) => {
    const { themeV2 } = useThemeContext();
    const [ariaExpanded, setAriaExpanded] = useState(false);

    const SelectedDate = () => {
        if (!selectedDate) {
            return (<span className={themeV2 ? 'body-regular' : ''} data-test="dates-select-placeholder">
                Select the delivery date
            </span>);
        }
        
        return <div className="vcard checkout-address--static" data-test="static-address">
                    <p className={classNames('fn address-entry',
                        { 'body-regular': themeV2 })}>
                        <span className="selected-date">{selectedDate}</span>
                    </p>
                </div>
    }

    return (
        <a
            aria-controls="datesDropdown"
            aria-expanded={ariaExpanded}
            // aria-label={language.translate('address.enter_or_select_address_action')}
            className="button dropdown-button dropdown-toggle--select"
            data-test="dates-select-button"
            href="#"
            id="datesToggle"
            onBlur={() => setAriaExpanded(false)}
            onClick={preventDefault(() => setAriaExpanded(!ariaExpanded))}
        >
            <SelectedDate />
        </a>
    );
};

const DateSelectMenu: FunctionComponent<{dates: DeliveryDate[], onSelectDate: (date: string) => void, selectedDate: string | null}> = ({ dates, onSelectDate, selectedDate }) => (
   <ul className="dropdown-menu instrumentSelect-dropdownMenu" id="addressDropdown">
        {dates.map((item) => (
            <li
                className="dropdown-menu-item dropdown-menu-item--select"
                data-test="address-select-option"
                key={item.date}
            >
                <a
                    data-test="address-select-option-action"
                    href="#"
                    onClick={preventDefault(() => onSelectDate(item.date))}
                >
                    <div className="vcard checkout-address--static" data-test="static-address">
                        <p className={classNames('fn address-entry')}>
                            <span className="selected-date">{item.description}</span>
                        </p>
                    </div>
                </a>
            </li>
        ))}

    </ul>
);

const ShippingDate: FunctionComponent<{dates: DeliveryDate[], handleSelectDate: (date: string) => void, selectedDate: string | null}> = (props) => {    
    return <Fieldset
                id="shipping-delivery-date-options"
                legend={
                    <Legend>
                        <TranslatedString id="shipping.shipping_delivery_date_label" />
                    </Legend>
                }
            >
                <div className="form-field">
                <div className="dropdown--select">
                    <DropdownTrigger
                        dropdown={
                            <DateSelectMenu
                                dates={props.dates}
                                onSelectDate={props.handleSelectDate}
                                selectedDate={props.selectedDate}
                            />
                            
                        }
                    >
                        <DateSelectButton
                            selectedDate={props.selectedDate}
                            // addresses={addresses}
                            // placeholderText={placeholderText}
                            // selectedAddress={selectedAddress}
                            // showSingleLineAddress={showSingleLineAddress}
                            // type={type}
                        />
                      
                    </DropdownTrigger>
                </div>
            </div>
        </Fieldset>
};

export default ShippingDate;