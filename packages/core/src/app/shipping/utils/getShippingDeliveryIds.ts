import { type ShippingDeliveryFormProps } from "../shippingDelivery/ShippingDeliveryForm";

export const getShippingDeliveryIds = ({ availableDeliveryDates }: ShippingDeliveryFormProps) => {
    const shippingOptionIds: { [id: string]: string } = {};

    (availableDeliveryDates || []).forEach((deliveryDate) => {
        shippingOptionIds[deliveryDate.id] = deliveryDate.id
            ? deliveryDate.id
            : '';
    });

    return { shippingOptionIds };
};
