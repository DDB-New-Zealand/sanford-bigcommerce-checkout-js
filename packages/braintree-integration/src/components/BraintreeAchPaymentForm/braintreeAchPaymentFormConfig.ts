import { FormField } from '@bigcommerce/checkout-sdk';

import { DynamicFormFieldType } from '@bigcommerce/checkout/ui';

import { BraintreeAchFieldType } from '../../validation-schemas';

export enum OwnershipTypes {
    Personal = 'Personal',
    Business = 'Business',
}

export enum AccountTypes {
    Savings = 'Savings',
    Checking = 'Checking',
}

const accountTypeOptions = [
    {
        value: AccountTypes.Savings,
        label: AccountTypes.Savings,
    },
    {
        value: AccountTypes.Checking,
        label: AccountTypes.Checking,
    },
];

export const ownershipTypeOptions = [
    {
        value: OwnershipTypes.Personal,
        label: OwnershipTypes.Personal,
    },
    {
        value: OwnershipTypes.Business,
        label: OwnershipTypes.Business,
    },
];

export const formFieldData: FormField[] = [
    {
        name: BraintreeAchFieldType.AccountType,
        custom: false,
        id: BraintreeAchFieldType.AccountType,
        label: 'Account Type',
        required: true,
        fieldType: DynamicFormFieldType.DROPDOWM,
        options: {
            items: accountTypeOptions,
        },
    },
    {
        name: BraintreeAchFieldType.AccountNumber,
        custom: false,
        id: BraintreeAchFieldType.AccountNumber,
        label: 'Account Number',
        required: true,
        max: 9,
        min: 8,
    },
    {
        name: BraintreeAchFieldType.RoutingNumber,
        custom: false,
        id: BraintreeAchFieldType.RoutingNumber,
        label: 'Routing Number',
        required: true,
    },
    {
        name: BraintreeAchFieldType.OwnershipType,
        custom: false,
        id: BraintreeAchFieldType.OwnershipType,
        label: 'Ownership Type',
        required: true,
        fieldType: DynamicFormFieldType.DROPDOWM,
        options: {
            items: ownershipTypeOptions,
        },
    },
    {
        name: BraintreeAchFieldType.FirstName,
        custom: false,
        id: BraintreeAchFieldType.FirstName,
        label: 'First Name',
        required: true,
    },
    {
        name: BraintreeAchFieldType.LastName,
        custom: false,
        id: BraintreeAchFieldType.LastName,
        label: 'Last Name',
        required: true,
    },
    {
        name: BraintreeAchFieldType.BusinessName,
        custom: false,
        id: BraintreeAchFieldType.BusinessName,
        label: 'Business Name',
        required: true,
    },
];
