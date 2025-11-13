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

const DateSelectButton: FunctionComponent = () => {
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

const DateSelectMenu: FunctionComponent<{dates: DeliveryDate[]}> = ({ dates }) => (
   <ul className="dropdown-menu instrumentSelect-dropdownMenu" id="addressDropdown">
        <li className="dropdown-menu-item dropdown-menu-item--select">
            <a
                data-test="add-new-address"
                href="#"
                onClick={preventDefault(() => {})}
                // onClick={preventDefault(() => onUseNewAddress(selectedAddress))}
            >
                <TranslatedString id="address.enter_address_action" />
            </a>
        </li>
        {dates.map((item) => (
            <li
                className="dropdown-menu-item dropdown-menu-item--select"
                data-test="address-select-option"
                key={item.date}
            >
                <a
                    data-test="address-select-option-action"
                    href="#"
                    onClick={preventDefault(() => {})}
                    // onClick={preventDefault(() => onSelectAddress(address))}
                >
                    {/* <StaticAddress address={address} type={type} /> */}
                    <div className="vcard checkout-address--static" data-test="static-address">
                        <p className={classNames('fn address-entry')}>
                            <span className="first-name">{item.description}</span>
                        </p>
                    </div>
                </a>
            </li>
        ))}

    </ul>
);


const ShippingDate: FunctionComponent<{dates: DeliveryDate[]}> = (props) => {    
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
                                // onSelectDate={handleSelectAddress}
                                // selectedDate={selectedAddress}
                            />
                            
                        }
                    >
                        <DateSelectButton
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