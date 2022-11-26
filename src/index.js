import React from 'react';
import ReactDOM from 'react-dom';

// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import ContextProvider from "./providers/context";
import Web3Provider from "./providers/web3";

import App from './App';
import rwv from './rwv';

ReactDOM.render(
    <Web3Provider>
        <ContextProvider>
            <MaterialThemeProvider>
                <MuiSnackbarProvider>
                    <NotificationProvider>
                        <App />
                    </NotificationProvider>
                </MuiSnackbarProvider>
            </MaterialThemeProvider>
        </ContextProvider>
    </Web3Provider>,
    document.getElementById('app-root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
rwv(console.log);
