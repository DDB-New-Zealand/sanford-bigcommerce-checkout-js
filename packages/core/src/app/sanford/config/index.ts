/**
 * Sanford Configuration
 * 
 * This file contains configuration values for the Sanford integration.
 * Update these values based on your environment and requirements.
 */

export interface SanfordConfig {
    BASE_URL: string;
    ONE_OFF_VARIANT_ID: number;
    SUBSCRIPTION_VARIANT_ID: number;
    SHIPPING_OPTION: string;
}

// Default configuration - update these values as needed
export const SANFORD_CONFIG: SanfordConfig = {
    // API base URL for Sanford services
    BASE_URL: process.env.NODE_ENV === 'production' 
        ? 'https://sanfordandsons.co.nz/api' 
        : 'https://staging-sanford-and-sons.vercel.app/api',
    
    ONE_OFF_VARIANT_ID: process.env.NODE_ENV === 'production' 
        ? 113 
        : 98,
    SUBSCRIPTION_VARIANT_ID: process.env.NODE_ENV === 'production' 
        ? 114
        : 99,

    SHIPPING_OPTION: "/bc-checkout/shipping-options"
};
