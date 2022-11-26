import React, { useEffect } from "react";

import { useSnackbar } from "notistack";
import { ConfirmProvider } from 'material-ui-confirm';

// ** Declare Notification Provider
const NotificationProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        const alert = (message, variant) => {
            enqueueSnackbar(message, { variant: variant });
        };
        window.alert = alert;
    }, [enqueueSnackbar]);
    
    return (
        <ConfirmProvider>
            {children}
        </ConfirmProvider>
    );
}

export default NotificationProvider;