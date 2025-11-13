import classNames from 'classnames';
import React, { type FunctionComponent, useState } from 'react';

import { useThemeContext } from '@bigcommerce/checkout/contexts';
import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { DropdownTrigger, Fieldset, Legend } from '@bigcommerce/checkout/ui';



import { type DeliveryDate } from './ShippingDelivery';
import { TranslatedString } from '@bigcommerce/checkout/locale';

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

const FrequencySelectButton: FunctionComponent = () => {
    const { themeV2 } = useThemeContext();
    const [ariaExpanded, setAriaExpanded] = useState(false);

    const SelectedAddress = () => {
        // if (!selectedAddress) {
        //     return (<span className={themeV2 ? 'body-regular' : ''} data-test="address-select-placeholder">
        //         {placeholderText ?? <TranslatedString id="address.enter_address_action" />}
        //     </span>);
        // }

        // return showSingleLineAddress
        //     ? <SingleLineStaticAddress address={selectedAddress} type={type} />
        //     : <StaticAddress address={selectedAddress} type={type} />;
        return <div className="vcard checkout-address--static" data-test="static-address">
                    <p className={classNames('fn address-entry',
                        { 'body-regular': themeV2 })}>
                        <span className="first-name">{`Select the delivery date `}</span>
                    </p>
                </div>
    }

    return (
        <a
            aria-controls="addressDropdown"
            aria-expanded={ariaExpanded}
            // aria-label={language.translate('address.enter_or_select_address_action')}
            className="button dropdown-button dropdown-toggle--select"
            data-test="address-select-button"
            href="#"
            id="addressToggle"
            onBlur={() => setAriaExpanded(false)}
            onClick={preventDefault(() => setAriaExpanded(!ariaExpanded))}
        >
            <SelectedAddress />
        </a>
    );
};

const FrequencySelectMenu: FunctionComponent= () => (
   <ul className="dropdown-menu instrumentSelect-dropdownMenu" id="addressDropdown">
        {["Weekly", "Fortnightly"].map((item) => (
            <li
                className="dropdown-menu-item dropdown-menu-item--select"
                data-test="address-select-option"
                key={item}
            >
                <a
                    data-test="address-select-option-action"
                    href="#"
                    onClick={preventDefault(() => {})}
                    // onClick={preventDefault(() => onSelectAddress(address))}
                >
                    <div className="vcard checkout-address--static" data-test="static-address">
                        <p className={classNames('fn address-entry')}>
                            <span className="first-name">{item}</span>
                        </p>
                    </div>
                </a>
            </li>
        ))}

    </ul>
);

const ShippingFrequency: FunctionComponent = () => {    
    return <Fieldset
                id="shipping-delivery-frequency-options"
                legend={
                    <Legend>
                        <TranslatedString id="shipping.shipping_delivery_frequency_label" />
                    </Legend>
                }
            >
                <div className="form-field">
                <div className="dropdown--select">
                    <DropdownTrigger
                        dropdown={
                            <FrequencySelectMenu
                                // onSelectDate={handleSelectAddress}
                                // selectedDate={selectedAddress}
                            />
                            
                        }
                    >
                        <FrequencySelectButton
                            // addresses={addresses}
                            // placeholderText={placeholderText}
                            // selectedFrequency={selectedFrequency}
                            // showSingleLineAddress={showSingleLineAddress}
                            // type={type}
                        />
                      
                    </DropdownTrigger>
                </div>
            </div>
        </Fieldset>
};

export default ShippingFrequency;