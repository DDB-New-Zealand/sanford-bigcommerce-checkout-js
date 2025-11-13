import React, { type FunctionComponent } from 'react';

import { LoadingSkeleton, type LoadingSkeletonProps } from './LoadingSkeleton';

const FieldFormSkeleton: FunctionComponent<LoadingSkeletonProps> = ({
    children,
    isLoading,
    renderWhileLoading,
}) => {
    const skeleton = (
        <div className="address-form-skeleton">
            <div className="address" />
        </div>
    );

    return <LoadingSkeleton {...{ children, isLoading, renderWhileLoading, skeleton }} />;
};

export default FieldFormSkeleton;
