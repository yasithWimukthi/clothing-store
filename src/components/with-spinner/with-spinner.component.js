import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

/**
 * WithSpinner Higher Order Component*/
const WithSpinner = WrappedComponent => {
    const spinner = ({isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        )
    }
    return spinner;
}

export default WithSpinner;
