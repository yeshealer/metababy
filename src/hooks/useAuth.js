import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey } from '../config';
import { connectorsByName } from '../utils/web3React';
import { setupNetwork } from '../utils/wallets';

const useAuth = () => {
    const { chainId, activate, deactivate } = useWeb3React()

    const login = useCallback(async (connectorID) => {
        const connector = connectorsByName[connectorID]
        if (connector) {
            await activate(connector, async (error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork()
                    if (hasSetup) {
                        await activate(connector);
                    }
                } else {
                    window.localStorage.removeItem(connectorLocalStorageKey)
                    if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                        alert('Provider Error: No provider was found', "error");
                    } else if (
                        error instanceof UserRejectedRequestErrorInjected ||
                        error instanceof UserRejectedRequestErrorWalletConnect
                    ) {
                        if (connector instanceof WalletConnectConnector) {
                            const walletConnector = connector;
                            walletConnector.walletConnectProvider = null
                        }
                        alert('Authorization Error: Please authorize to access your account', "error");
                    } else {
                        alert(`${error.name}: ${error.message}`, "error");
                    }
                }
            });
        } else {
            alert('Unable to find connector: The connector config is wrong', "error");
        }
    }, [activate])

    const logout = useCallback(() => {
        deactivate()
    }, [deactivate, chainId])

    return { login, logout }
}

export default useAuth;
